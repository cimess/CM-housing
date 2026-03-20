const rateLimit = require("express-rate-limit");

// 🔐 Login limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tries per window
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// 🔐 Register limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 registrations per hour per IP
  message: { message: "Too many accounts created from this IP, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔐 Forgot password limiter
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // only 3 reset requests in 15 mins
  message: { message: "Too many password reset attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, registerLimiter, forgotPasswordLimiter };

