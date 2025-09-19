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
      { username: foundUser.username, role: foundUser.role, id:foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: 300 }
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
      { username: newUser.username, role: newUser.role, id:newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: 300 }
    );
    req.session.token = token;
    return res.json({ message: "successful registeration!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};


module.exports = { login, register };
