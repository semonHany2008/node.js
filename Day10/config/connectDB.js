const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const connectDB = async () => {
  try {
    const mongoDB_URL = process.env.DATABASE_URL;
    if (!mongoDB_URL)
      throw new Error("DATABASE_URL is not defined in environment variables!");
    await mongoose.connect(mongoDB_URL);
    console.log("database connected!...");
  } catch (err) {
    console.log("database connection failed: ", err);
  }
};
// connectDB();
module.exports = { connectDB };
