const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/limiter');

router.post('/register', authLimiter, authController.register);
router.get('/verify-email', authController.verifyEmail); // ?token=...
router.post('/login', authLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken); // uses HttpOnly cookie
router.post('/logout', authController.logout);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword); // body: token, newPassword

module.exports = router;
