const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected...");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports=connectDB;
