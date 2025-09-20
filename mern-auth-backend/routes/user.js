const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/profile', authenticate, (req, res) => {
  res.json({ profile: req.user });
});

module.exports = router;
