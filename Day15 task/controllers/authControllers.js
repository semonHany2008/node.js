const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const login = async (req, res) => {
  try {
    let { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "emailOrUsername and password are required!" });
    }
    let foundUser = await usersModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!foundUser) {
      return res.status(400).json({ message: "user not found!" });
    }
    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid password!" });
    }
    let token = jwt.sign(
      { username: foundUser.username, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
    req.session.token = token;
    return res.json({ message: "successful login!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const register = async (req, res) => {
  try {
    let {
      username,
      password,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      role,
    } = req.body;
    if (
      !username ||
      !password ||
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "all fields are required!" });
    }
    if (!role) {
      role = "user";
    }
    let foundUser = await usersModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      return res.status(400).json({ message: "emailOrUsername already used!" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    let newUser = new usersModel({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      role,
    });
    await newUser.save();
    let token = jwt.sign(
      { username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );
    req.session.token = token;
    return res.json({ message: "successful register!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "some error occured on logout!" });
      } else {
        return res.json({ message: "logged out successfully!" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const forgot_password = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ message: "email is require!" });
    }
    let foundUser = await usersModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "user not found!" });
    }
    const otp_num = (Math.floor(Math.random() * 900000) + 100000).toString();
    foundUser.otp = otp_num;
    foundUser.otpExpiry = new Date(Date.now() + 1000 * 60 * 2);
    await foundUser.save();
    res.json({ message: "otp: " + otp_num });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const send_otp = async (req, res) => {
  try {
    const { otpCode, newPassword, confirmPassword } = req.body;
    let foundUser = await usersModel.findOne({ otp: otpCode });
    if (!foundUser) {
      return res.status(400).json({ message: "invalid otp!" });
    }
    if (Date.now() > foundUser.otpExpiry) {
      return res.status(400).json({ message: "expired otp!" });
    }
    if (newPassword != confirmPassword) {
      return res
        .status(400)
        .json({ message: "new and confirm password must be the same!" });
    }
    foundUser.password = bcrypt.hashSync(newPassword, 10);
    foundUser.otp=null;
    foundUser.otpExpiry=null;

    await foundUser.save();
    res.json({ message: "password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

module.exports = { login, logout, register, forgot_password, send_otp };
