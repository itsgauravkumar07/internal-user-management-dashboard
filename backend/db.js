const mongoose = require("mongoose");

async function connectDB() {

  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB connected");

  } catch (err) {

    console.log("❌ MongoDB ERROR", err);

    throw err;
  }
}

module.exports = connectDB;