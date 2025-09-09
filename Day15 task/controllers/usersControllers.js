const usersModel = require("../models/users");
const studentsModel = require("../models/students");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const getusers = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated, login first!" });
    }
    let plainToken;
    try {
      plainToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    if (plainToken.role == "user") {
      return res.status(403).json({ message: "forbidden, admin only!" });
    }
    let users = await usersModel.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const getuserByID = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated, login first!" });
    }
    let plainToken;
    try {
      plainToken=jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    let id = req.params.id;
    let founduser = await usersModel.findOne({
      _id: id,
    });

    if (!founduser) {
      return res.status(400).json({ message: "user not found!" });
    }

    if (
      plainToken.role == "user" &&
      plainToken.username != founduser.username
    ) {
      return res
        .status(403)
        .json({ message: "forbidden, you can access only your own profile!" });
    }

    return res.json({ user: founduser });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const delete_user = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated, login first!" });
    }
    let plainToken;
    try {
      plainToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    let id = req.params.id;

    let founduser = await usersModel.findOne({
      _id: id,
    });

    if (!founduser) {
      return res.status(400).json({ message: "user not found!" });
    }

    if (
      plainToken.role == "user" &&
      plainToken.username != founduser.username
    ) {
      return res
        .status(403)
        .json({ message: "forbidden, you can delete only your own profile!" });
    }
    let deleteduser = await usersModel.findByIdAndDelete({ _id: id });
    if (deleteduser.role == "user") {
      await studentsModel.deleteOne({ username: deleteduser.username });
    }
    res.json({
      message: "user with id " + id + " deleted successfully!",
      deleteduser,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const add_user = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated, login first!" });
    }
    let plainToken;
    try {
      plainToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    let {
      username,
      password,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
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

    if (plainToken.role == "user" && username != plainToken.username) {
      return res.status(403).json({
        message: "forbidden, you can't add another user than you!",
      });
    }

    let foundUser = await usersModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      return res.status(400).json({ message: "emailOrUsername already used!" });
    }

    let hashedPassword = bcrypt.hashSync(password, 10);
    let newUser = new usersModel({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
    });
    await newUser.save();
    res.json({ message: "user added successfully!", newUser });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const edit_user = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated, login first!" });
    }
    let plainToken;
    try {
      plainToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    let id = req.params.id;
    let {
      username,
      password,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
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

    if (plainToken.role == "user" && username != plainToken.username) {
      return res.status(403).json({
        message: "forbidden, you can't edit another user than you!",
      });
    }

    let founduser = await usersModel.findOne({
      _id: id,
    });

    if (!founduser) {
      return res.status(400).json({ message: "user not found!" });
    }

    let hashedPassword = bcrypt.hashSync(password, 10);
    let updateduser = await usersModel.findByIdAndUpdate(
      { _id: id },
      {
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        address,
        phoneNumber,
      },
      { new: true }
    );
    res.json({
      message: "user with id " + id + " edited successfully!",
      updateduser,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

module.exports = {
  getusers,
  delete_user,
  getuserByID,
  add_user,
  edit_user,
};
