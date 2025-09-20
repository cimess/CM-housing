const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  revoked: { type: Boolean, default: false },
  replacedByToken: { type: String },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  createdByIp: { type: String }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
