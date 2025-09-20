const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
 const token = req.cookies.accessToken;;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });


  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticate;
