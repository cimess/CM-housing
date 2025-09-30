const mongoose = require("mongoose");

const businessProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  dob: String,
  nin: String,
  idType: String,
  idNumber: String,
  company: String,
  rcNumber: String,
  officePhone: String,
  isCompleted: { type: Boolean, default: false }, // mark when profile setup done
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BusinessProfile", businessProfileSchema);
