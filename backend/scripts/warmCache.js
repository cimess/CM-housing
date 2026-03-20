require("dotenv").config();
const { connectDB } = require("../config/db");
const redis = require("../config/redis");
const House = require("../models/House");

(async () => {
  try {
    await connectDB();
    console.log("🔥 Warming cache with top listings...");

    const houses = await House.find().limit(20).lean();
    await redis.set("houses:all:start:20", JSON.stringify({ houses, hasMore: false }), "EX", 300);

    console.log("✅ Cache warmed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Cache warming error:", err);
    process.exit(1);
  }
})();
