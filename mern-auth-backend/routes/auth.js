const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter, registerLimiter, forgotPasswordLimiter } = require('../middleware/limiter');

// Registration
router.post('/register', registerLimiter, authController.register);

// Login
router.post('/login', loginLimiter, authController.login);

// Forgot password
router.post('/forgot-password', forgotPasswordLimiter, authController.forgotPassword);

// Other routes
router.get('/verify-email', authController.verifyEmail);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
