const express = require("express");
const House = require("../models/House");
const authMiddleware = require("../middleware/authenticate");

const router = express.Router();

// Create house listing
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { houseType, location, bedrooms, bathrooms, rentPrice, description, images } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const house = new House({
      user: req.user.id, // logged in user
      houseType,
      location,
      bedrooms,
      bathrooms,
      rentPrice,
      description,
      images,
    });

    await house.save();
    res.json({ message: "House listed successfully!", house });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
