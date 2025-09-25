const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  houseType: String,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  rentPrice: Number,
  description: String,
  images: [String], // array of Cloudinary URLs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("House", houseSchema);
