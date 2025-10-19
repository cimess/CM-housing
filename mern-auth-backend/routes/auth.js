const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter, registerLimiter, forgotPasswordLimiter, } = require('../middleware/limiter');
const authenticate=require('../middleware/authenticate')
// Registration
router.post('/register', registerLimiter, authController.register);

// Login
router.post('/login', loginLimiter, authController.login);

// Fetch logged-in user
router.get('/me', authenticate, authController.me);


// Forgot password
router.post('/forgot-password', forgotPasswordLimiter, authController.forgotPassword);

// Other routes
router.get('/verify-email', authController.verifyEmail);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.post('/reset-password',authenticate, authController.resetPassword);
router.post('/recover/:token',authController.recoverPassword)

module.exports = router;
