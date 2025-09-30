const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust if needed

const MONGO_URI = "mongodb+srv://cimessthemanofvalor:Password25825800.@cluster0.wv3adbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function addUser() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const email = "test1@example.com";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists:", email);
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("Test123456@", 10);
    const user = new User({
  name: "Cimess",
  email: "test1@example.com",
  passwordHash: hashedPassword,
  isEmailVerified: true
});


    await user.save();
    console.log("✅ User created:", user);

    mongoose.disconnect();
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

addUser();

