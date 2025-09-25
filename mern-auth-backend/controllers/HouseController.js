const House = require("../models/House");
const BusinessProfile = require("../models/businessProfile");

exports.createHouse = async (req, res) => {
  try {
    const { userId } = req.user;

    // ✅ Check if profile is completed
    const profile = await BusinessProfile.findOne({ user: userId });
    if (!profile || !profile.isCompleted) {
      return res.status(403).json({ message: "Complete your profile before listing a house" });
    }

    const house = new House({ ...req.body, user: userId });
    await house.save();

    return res.status(201).json({ message: "House listed", house });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMyHouses = async (req, res) => {
  try {
    const { userId } = req.user;
    const houses = await House.find({ user: userId });
    return res.json(houses);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
