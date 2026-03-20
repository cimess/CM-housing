const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

function signRefreshToken() {
  // keep refresh token as opaque (uuid) stored in DB
  return uuidv4();
}

module.exports = { signAccessToken, verifyAccessToken, signRefreshToken };
