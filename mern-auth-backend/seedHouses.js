// seedHousesWithUnsplash.js
const mongoose = require("mongoose");
const User = require("./models/User");
const House = require("./models/House");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI; // change to your DB

// ------------------- IMAGE URLs -------------------
const roomImages = [
  "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1630699144919-681cf308ae82?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1589459072535-550f4fae08d2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=627"
];

// ------------------- HELPER -------------------
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------- MAIN -------------------
(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");

    // Drop old data
    await House.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️ Old houses and users deleted");

    // Create dummy users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const user = new User({
        firstname: `User${i}`,
        lastname: `Test${i}`,
        email: `user${i}@example.com`,
        phone: `080000000${i}`,
        passwordHash: "hashedpassword",
        isEmailVerified: true
      });
      await user.save();
      users.push(user);
    }
    console.log("👤 Dummy users created");

    // Seed houses
    const houseTypes = ["Bungalow", "Apartment", "Duplex", "Studio"];
    const locations = [
      { state: "Lagos", lga: "Ikeja", town: "Ojodu" },
      { state: "Lagos", lga: "Yaba", town: "Akoka" },
      { state: "Ogun", lga: "Abeokuta North", town: "Itoku" }
    ];
    const descriptions = [
      "Spacious and cozy with modern amenities.",
      "Well-lit apartment perfect for families.",
      "Affordable house in a secure neighborhood.",
      "Fully furnished with parking space."
    ];

    for (let i = 0; i < 50; i++) {
      const user = randomItem(users);

      // pick 1-5 random images
      const imagesCount = Math.floor(Math.random() * 5) + 1;
      const images = [];
      for (let j = 0; j < imagesCount; j++) {
        images.push(randomItem(roomImages));
      }

      const house = new House({
        user: user._id,
        roleOfLister: Math.random() > 0.5 ? "landlord" : "agent",
        companyName: `${user.firstname} ${user.lastname}`,
        durationType: Math.random() > 0.5 ? "short" : "long",
        pricePerNight: Math.floor(Math.random() * 20000) + 5000,
        rentPrice: Math.floor(Math.random() * 300000) + 50000,
        houseType: randomItem(houseTypes),
        location: randomItem(locations),
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        description: randomItem(descriptions),
        petAllowed: Math.random() > 0.5,
        furnished: Math.random() > 0.5,
        amenities: ["Wi-Fi", "Parking", "Water", "Security"],
        images, // ✅ array of URLs
        alt: "House image"
      });

      await house.save();
      console.log(`🏠 House ${i + 1} created`);
    }

    console.log("🎉 All 50 houses seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding houses:", err);
    process.exit(1);
  }
})();
