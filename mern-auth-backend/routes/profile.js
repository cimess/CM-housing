// routes/profile.js
const express = require("express");
const authMiddleware = require("../middleware/authenticate");
const User = require("../models/User"); // adjust path if needed

const router = express.Router();

// Get current user profile
router.get("/me", authMiddleware, async (req, res) => {
   console.log('i reached profile.js in backend ')
  try {
   
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Save/update profile
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { firstname, lastname, email, phone, address, whatsapp, website } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { firstname, lastname, email, phone, address, whatsapp, website },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
