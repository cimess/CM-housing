const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter, registerLimiter, forgotPasswordLimiter, } = require('../middleware/limiter');
const authenticate=require('../middleware/authenticate')
// Registration
router.post('/register', registerLimiter, authController.register);

// Login
router.post('/login', loginLimiter, authController.login);

// Admin Login
router.post('/admin-login', authController.adminLogin)
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

// Profile Image Upload
// Multer Config for Profile Images
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, WebP allowed."));
    }
  }
});
router.post('/upload-profile-image', authenticate, upload.single('image'), authController.uploadProfileImage);

// DEV: Clear Redis Cache
router.post('/clear-cache', authController.clearCache);

module.exports = router;
