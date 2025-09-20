module.exports = function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const has = req.user.roles.some(r => roles.includes(r));
    if (!has) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
