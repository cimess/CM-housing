const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
const authHeader = req.headers.authorization || '';
const tokenFromHeader = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
const token = tokenFromHeader || req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized: no token' });

  try {
    // if you use RS256, use public key here: process.env.JWT_PUBLIC_KEY
    const verifyOptions = { algorithms: ['HS256'] };
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET, verifyOptions);

    // optionally handle token rotation/jti checks here
    const user = await User.findById(payload.sub).select('-passwordHash').lean();

    if (!user) {
      res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
      return res.status(401).json({ message: 'Unauthorized: user removed' });
    }

    req.user = user; // minimal user object - don't attach secrets
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticate;


















// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// async function authenticate(req, res, next) {
//  const token = req.cookies.accessToken;;
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });


//   try {
//     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     const user = await User.findById(payload.sub).select('-passwordHash');
//     if (!user) return res.status(401).json({ message: 'User not found' });
//     req.user = user;
//     next();
//   } catch (err) {
//     res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });

//     return res.status(401).json({ message: 'Invalid or expired token' });
    
//   }
// }

// module.exports = authenticate;
