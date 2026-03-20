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
const businessProfileRoutes = require('./routes/businessProfile');
const profileRoutes = require("./routes/profile");
const House=require("./routes/House");
const app = express();
app.set('trust proxy', 1); // Trust Render's proxy
const PORT = process.env.PORT || 4000;

connectDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// CORS - adjust origin in production
app.use(cors({
  origin: [process.env.FRONTEND_URL,process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://cm-housing.onrender.com/api"],
  credentials: true
}));

// Global rate limiter (basic). Sensitive endpoints will have stronger limiter.
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200
});
app.use(globalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/business-profile', businessProfileRoutes);
app.use("/api/houses", House);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", require("./routes/reports"));

const HouseModel = require('./models/House');

app.get('/sitemap.xml', async (req, res) => {
  try {
    const houses = await HouseModel.find({}, '_id updatedAt');
    const frontendUrl = process.env.FRONTEND_URL || 'https://cmhousing.com';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${frontendUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${houses.map(house => `
        <url>
          <loc>${frontendUrl}/house/${house._id}</loc>
          <lastmod>${new Date(house.updatedAt || Date.now()).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).end();
  }
});

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
