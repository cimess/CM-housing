const BusinessProfile = require("../models/businessProfile");

exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user._id; // <-- fix this
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
   const profile = await BusinessProfile.findOne({ user: req.user._id });
res.json(profile || {}); // always returns object

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
