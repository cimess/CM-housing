const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Who is listing it?
  roleOfLister: { type: String, enum: ["agent", "landlord"], required: true },
  companyName: { type: String }, // required if agent
  consultationFee: { type: Number, default: 0 }, // only if agent

  // Duration type
  durationType: { type: String, enum: ["short", "long"], required: true },
  maxDuration: { type: Number }, // months, only if short
  pricePerNight: { type: Number }, // only if short
  rentPrice: { type: Number }, // only if long

  // House details
  houseType: { type: String, required: true }, // e.g. Apartment, Duplex, Studio
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String },
  petAllowed: { type: Boolean, default: false },
  furnished: { type: Boolean, default: false },
  amenities: [String], // e.g. ["Parking", "Wi-Fi", "Security"]

  // Media
  images: [String],
  alt: String,

  // Geo (optional but useful later for maps/search)
  mapLocation: {
    lat: Number,
    lng: Number,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("House", houseSchema);
