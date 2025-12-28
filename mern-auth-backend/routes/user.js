const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const UserController = require('../controllers/UserController');

router.get('/profile', authenticate, (req, res) => {
  res.json({ profile: req.user });
});

// Admin route to get all users (should be admin protected in future)
router.get('/', authenticate, UserController.getAllUsers);
router.delete('/:id', authenticate, UserController.deleteUser);
router.put('/:id', authenticate, UserController.updateUserStatus);

module.exports = router;
