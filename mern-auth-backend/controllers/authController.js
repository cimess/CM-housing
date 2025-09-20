const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const AuditLog = require('../models/AuditLog');
const { signAccessToken, signRefreshToken } = require('../utils/token');
const { sendEmail } = require('../utils/emailService');
const { passwordSchema } = require('../utils/passwordPolicy');
const { v4: uuidv4 } = require('uuid');

const CLIENT_COOKIE_NAME = 'refreshToken';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true',
  sameSite: 'lax',
  // in production set domain/path appropriately
};

function addAudit(userId, action, ip, meta = {}) {
  const doc = new AuditLog({ user: userId, action, ip, meta });
  doc.save().catch(() => {});
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  // validate password with policy
  const { error } = passwordSchema.validate(password);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, passwordHash });
  await user.save();

  // email verification token (jwt short lived)
  const emailToken = jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailToken}`;

  await sendEmail(email, 'Verify your email', `Click here to verify: ${verifyUrl}`);

  addAudit(user._id, 'register', req.ip, { email });

  return res.status(201).json({ message: 'User registered. Please verify your email.' });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: 'Token required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    user.isEmailVerified = true;
    await user.save();
    addAudit(user._id, 'email_verified', req.ip);
    // redirect to front-end success page or return JSON
    return res.redirect(`${process.env.FRONTEND_URL}/email-verified`);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // account lockout
  if (user.isLocked()) {
    return res.status(423).json({ message: 'Account locked. Try later.' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      // lock account for 15 minutes
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      user.failedLoginAttempts = 0;
    }
    await user.save();
    addAudit(user._id, 'failed_login', req.ip);
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // successful login - reset counters
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  await user.save();

  // require email verified
  if (!user.isEmailVerified) {
    return res.status(403).json({ message: 'Please verify your email' });
  }

  // create access token
  const accessToken = signAccessToken({ sub: user._id, roles: user.roles });

  // rotate/create refresh token
  const tokenValue = signRefreshToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7d by default
  const refreshDoc = new RefreshToken({
    user: user._id,
    token: tokenValue,
    expiresAt,
    createdByIp: req.ip
  });
  await refreshDoc.save();

  // set refresh token as HttpOnly cookie
  res.cookie(CLIENT_COOKIE_NAME, tokenValue, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });

  addAudit(user._id, 'login', req.ip);

  return res.json({
    accessToken,
    user: { id: user._id, email: user.email, name: user.name, roles: user.roles }
  });
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies[CLIENT_COOKIE_NAME] || req.body.token;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  const saved = await RefreshToken.findOne({ token }).populate('user');
  if (!saved || saved.revoked) {
    // revoke all refresh tokens for safety in case of reuse
    if (saved && saved.user) {
      await RefreshToken.updateMany({ user: saved.user._id }, { revoked: true });
      addAudit(saved.user._id, 'refresh_replay_detected', req.ip);
    }
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  if (saved.expiresAt < new Date()) {
    saved.revoked = true;
    await saved.save();
    return res.status(401).json({ message: 'Refresh token expired' });
  }

  // rotate: create new refresh token, mark old as replaced
  const newTokenValue = signRefreshToken();
  const newExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  saved.revoked = true;
  saved.replacedByToken = newTokenValue;
  await saved.save();

  const newDoc = new RefreshToken({
    user: saved.user._id,
    token: newTokenValue,
    expiresAt: newExpires,
    createdByIp: req.ip
  });
  await newDoc.save();

  // issue new access token
  const accessToken = signAccessToken({ sub: saved.user._id, roles: saved.user.roles });

  // set cookie
  res.cookie(CLIENT_COOKIE_NAME, newTokenValue, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 });
  addAudit(saved.user._id, 'refresh', req.ip);

  return res.json({ accessToken });
};

exports.logout = async (req, res) => {
  const token = req.cookies[CLIENT_COOKIE_NAME] || req.body.token;
  if (token) {
    await RefreshToken.findOneAndUpdate({ token }, { revoked: true });
  }
  res.clearCookie(CLIENT_COOKIE_NAME);
  return res.json({ message: 'Logged out' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: 'If that account exists, a reset email was sent.' });

  const resetToken = jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1h' });
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail(email, 'Password reset', `Reset here: ${resetUrl}`);
  addAudit(user._id, 'forgot_password', req.ip);
  return res.json({ message: 'If that account exists, a reset email was sent.' });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' });

  const { error } = passwordSchema.validate(newPassword);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    // revoke all refresh tokens
    await RefreshToken.updateMany({ user: user._id }, { revoked: true });
    addAudit(user._id, 'password_reset', req.ip);

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};
