const House = require("../models/House");
const BusinessProfile = require("../models/businessProfile");

exports.createHouse = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check profile
    const profile = await BusinessProfile.findOne({ user: userId });
    if (!profile || !profile.isCompleted) {
      return res.status(403).json({ message: "Complete your profile before listing a house" });
    }

    const {
      roleOfLister,
      companyName,
      consultationFee,
      durationType,
      rentPrice,
      pricePerNight,
      maxDuration,
    } = req.body;

    // Validate based on durationType
    if (durationType === "short") {
      if (!pricePerNight) return res.status(400).json({ message: "Short-let requires pricePerNight" });
      if (maxDuration > 6) return res.status(400).json({ message: "Short-let max duration is 6 months" });
    }
    if (durationType === "long" && !rentPrice) {
      return res.status(400).json({ message: "Long-let requires rentPrice" });
    }

    // If agent, require company + fee
    if (roleOfLister === "agent" && (!companyName || !consultationFee)) {
      return res.status(400).json({ message: "Agent listings must include companyName & consultationFee" });
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
