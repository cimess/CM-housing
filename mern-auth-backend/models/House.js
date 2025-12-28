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

  // Availability Status
  isAvailable: { type: Boolean, default: true },

  // House details
  houseType: { type: String, required: true }, // e.g. Apartment, Duplex, Studio
location: {
  state: { type: String, required: true },
  lga: { type: String, required: false },
  town: { type: String, required: false },
  address: { type: String, required: false }, // extra
},

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


  // Comments, Ratings, Likes
comments: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: String,
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  }
],

likes: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }
],

averageRating: { type: Number, default: 0 },
totalRatings: { type: Number, default: 0 },


  createdAt: { type: Date, default: Date.now },

});
houseSchema.index({
  houseType: "text",
  description: "text",
  "location.state": "text",
  "location.lga": "text",
  "location.town": "text",
});

module.exports = mongoose.model("House", houseSchema);
