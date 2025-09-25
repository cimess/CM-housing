require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const profileRoutes = require("./routes/profile");
const House = require("./routes/House");

const app = express();

// ✅ Use Render's port if provided, fallback to 3000 locally
const PORT = process.env.PORT || 3000;

connectDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// ✅ Correct CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Netlify URL in prod
  credentials: true
}));

// ✅ Rate limiter
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200
});
app.use(globalLimiter);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/protected', protectedRoutes);
app.use("/api/houses", House);
app.use("/api/profile", profileRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
