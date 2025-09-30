const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
 website:{type: String, trim:true },  
  address: {type :String, trim:true}, 
whatsapp:{type: String, trim:true},
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },

  roles: { type: [String], default: ['user'] },
  isEmailVerified: { type: Boolean, default: false },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});


userSchema.methods.isLocked = function () {
  return this.lockedUntil && this.lockedUntil > new Date();
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};
module.exports = mongoose.model('User', userSchema);




