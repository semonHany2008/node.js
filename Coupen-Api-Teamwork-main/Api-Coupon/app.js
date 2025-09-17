const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Coupen } = require("./models/coupen");
const { Auth } = require("./models/auth");
const { connectDB } = require("./config/connDB");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Function Add Coupon
async function addCoupon() {
  const code = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit code
  const newCoupon = new Coupen({ code });
  await newCoupon.save();
}

// Function to check and insert coupons
async function ensureCoupons() {
  const checkCouponSize = await Coupen.find();

  // Check if the number of coupons is less than 5
  if (checkCouponSize.length < 5) {
    for (let i = 0; i < 10; i++) {
      await addCoupon(); // wait for each save
    }
    console.log("10 coupons added successfully");
  } else {
    console.log("Enough coupons already exist");
  }
}

app.post("/get-coupen", async (req, res) => {
  const { username, password } = req.headers;
  const auth = await Auth.findOne({ username });
  if (!auth) {
    return res.status(401).send("Unauthorized..........");
  }
  if (auth.password !== password) {
    return res.status(401).send("Unauthorized..........");
  }
  if (auth.number === 0) {
    return res.status(401).send("Unauthorized..........");
  }
  const number = auth.number;
  await Auth.findOneAndUpdate({ username }, { number: number - 1 });
  const Allcoupen = await Coupen.find();
  const coupen = Allcoupen[0];
  res.send({ "Discount code ": coupen.code });
});

app.post("/discount", async (req, res) => {
  const { code } = req.body;
  const coupen = await Coupen.findOne({ code });
  if (!coupen) {
    return res.status(400).send("Invalid code");
  }
  await Coupen.deleteOne({
    code,
  });
  // Function to check and insert coupons
  ensureCoupons();
  res.send("Discount applied");
});

mongoose.connection.once("open", () => {
  console.log("Database connected......");
  app.listen(process.env.PORT, () => {
    console.log("Server started on port "+process.env.PORT);
  });
});

mongoose.mongoose.connection.on("error", (error) => {
  console.error(error);
});
