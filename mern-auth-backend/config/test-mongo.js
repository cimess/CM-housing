const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://cimessthemanofvalor:Password25825800.@cluster0.wv3adbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected ✅");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  });
