const BusinessProfile = require("../models/businessProfile");
const redis = require("../config/redis"); // make sure you have a Redis client setup

// Save or update profile (with cache invalidation)
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const existing = await BusinessProfile.findOne({ user: userId });

    if (existing) {
      Object.assign(existing, req.body, { isCompleted: true });
      await existing.save();

      // Invalidate Redis cache for this user's profile
      await redis.del(`profile:${userId}`);

      return res.json({ message: "Profile updated", profile: existing });
    }

    const profile = new BusinessProfile({ ...req.body, user: userId, isCompleted: true });
    await profile.save();

    // Invalidate Redis cache (just in case)
    await redis.del(`profile:${userId}`);

    return res.status(201).json({ message: "Profile saved", profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get profile (with caching)
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const cacheKey = `profile:${userId}`;

    // ⚡ Check Redis cache first
    const cachedProfile = await redis.get(cacheKey);
    if (cachedProfile) {
      console.log("💾 Profile cache hit");
      return res.json(JSON.parse(cachedProfile));
    }

    console.log("🧠 Profile cache miss → querying MongoDB");
    const profile = await BusinessProfile.findOne({ user: userId }).lean();
    const result = profile || {};

    // ⚡ Store in cache for 5 minutes
    await redis.set(cacheKey, JSON.stringify(result), "EX", 300);

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
