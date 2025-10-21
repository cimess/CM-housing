// scripts/createIndexes.js
require("dotenv").config(); // loads .env for MONGO_URI
const mongoose = require("mongoose");
const { connectDB } = require("../mern-auth-backend/config/db"); // path to your connectDB.js
const House = require("../mern-auth-backend/models/House");
const User = require("../mern-auth-backend/models/User");
const BusinessProfile = require("../mern-auth-backend/models/businessProfile");

(async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    console.log("⚙️ Syncing indexes...");
    await Promise.all([
      House.syncIndexes(),
      User.syncIndexes(),
      BusinessProfile.syncIndexes(),
    ]);

    console.log("🚀 Indexes created or updated successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating indexes:", err);
    process.exit(1);
  }
})();
