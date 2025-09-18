const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

app.get("/get-coupen", async (req, res) => {
  const { username, password } = req.headers;
  const auth = await Auth.findOne({ username });
  if (!auth) {
    return res.status(401).send("Unauthorized 1..........");
  }
  if (!bcrypt.compareSync(password, auth.password)) {
    return res.status(401).send("Unauthorized 2..........");
  }
  if (auth.number === 0) {
    return res.status(401).send("Unauthorized 3..........");
  }
  const number = auth.number;
  await Auth.findOneAndUpdate({ username }, { number: number - 1 });
  const Allcoupen = await Coupen.find();
  const coupen = Allcoupen[0];
  res.json({ message: "Discount code: " + coupen.code });
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
  res.json({ message: "Discount applied" });
});

app.post("/add-user", async (req, res) => {
  const { username, password } = req.headers;
  let foundUser = await Auth.findOne({
    username,
  });
  if (foundUser) {
    return res
      .status(400)
      .json({ message: "user already exist in coupen model!" });
  }
  let newUserCoupon = new Auth({ username, password });
  await newUserCoupon.save();
  res.json({ message: "new user data added to coupen model successfully!" });
});

app.post("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  if (!username || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "All fields are required for change pass in coupen model" });
  }

  const getUser = await Auth.findOne({ username });
  if (!getUser) {
    return res.status(404).json({ message: "User not found in coupen model" });
  }

  if (!oldPassword == getUser.password) {
    return res
      .status(400)
      .json({ message: "Invalid old password in coupen model" });
  }

  getUser.password = newPassword;
  await getUser.save();
  res.json({ message: "password changed in coupen model successfully!" });
});

app.delete("/delete-user", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required in coupen model" });
  }

  const getUser = await Auth.findOne({ username });
  if (!getUser) {
    return res.status(404).json({ message: "User not found in coupen model" });
  }

  if (!password == getUser.password) {
    return res
      .status(400)
      .json({ message: "Invalid password in coupen model" });
  }
  await Auth.findOneAndDelete({ username });

  return res
    .status(200)
    .json({ message: "user deleted successfully in coupen model" });
});

mongoose.connection.once("open", () => {
  console.log("Database connected......");
  app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
  });
});

mongoose.mongoose.connection.on("error", (error) => {
  console.error(error);
});
