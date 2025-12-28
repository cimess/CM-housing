const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['House', 'User'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'targetType' },
  reason: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'resolved', 'dismissed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
