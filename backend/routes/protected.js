const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

// admin-only example
router.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({ secret: 'only for admins' });
});

module.exports = router;
