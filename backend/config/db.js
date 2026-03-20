const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');

  const isProd = process.env.NODE_ENV === "production";

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: !isProd, // ✅ autoIndex only in dev
  });

  console.log(`✅ MongoDB connected [${isProd ? "PROD" : "DEV"} mode]`);
}
 
module.exports = { connectDB };
