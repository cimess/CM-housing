const BusinessProfile = require("../models/businessProfile");

exports.saveProfile = async (req, res) => {
  try {
    const { userId } = req.user; // from JWT middleware
    const existing = await BusinessProfile.findOne({ user: userId });

    if (existing) {
      Object.assign(existing, req.body, { isCompleted: true });
      await existing.save();
      return res.json({ message: "Profile updated", profile: existing });
    }

    const profile = new BusinessProfile({ ...req.body, user: userId, isCompleted: true });
    await profile.save();

    return res.status(201).json({ message: "Profile saved", profile });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profile = await BusinessProfile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
