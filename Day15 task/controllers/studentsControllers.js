const studentsModel = require("../models/students");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const getStudents = async (req, res) => {
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
    let students = await studentsModel.find();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const getStudentByID = async (req, res) => {
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
    let foundStudent = await studentsModel.findOne({
      _id: id,
    });

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }

    if (
      plainToken.role == "user" &&
      plainToken.username != foundStudent.username
    ) {
      return res
        .status(403)
        .json({ message: "forbidden, you can access only your own profile!" });
    }

    return res.json({ student: foundStudent });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const delete_student = async (req, res) => {
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

    let foundStudent = await studentsModel.findOne({
      _id: id,
    });

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }

    if (
      plainToken.role == "user" &&
      plainToken.username != foundStudent.username
    ) {
      return res
        .status(403)
        .json({ message: "forbidden, you can delete only your own profile!" });
    }
    let deletedStudent = await studentsModel.findByIdAndDelete({ _id: id });
    res.json({
      message: "student with id " + id + " deleted successfully!",
      deletedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const add_student = async (req, res) => {
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
    let { username, courses, state } = req.body;
    if (plainToken.role == "user") {
      if (username && username != plainToken.username) {
        return res.status(403).json({
          message: "forbidden, you can't add another student than you!",
        });
      } else if (!username) username = plainToken.username;
      if (!courses || !state) {
        return res
          .status(400)
          .json({ message: "student courses and state are required!" });
      }
    }
    if (!username || !courses || !state) {
      return res.status(400).json({ message: "all fields are required!" });
    }

    let foundStudent = await studentsModel.findOne({ username });
    if (foundStudent) {
      return res.json({ message: "student already exist!" });
    }

    let newStudent = new studentsModel({ username, courses, state });
    await newStudent.save();
    res.json({ message: "student added successfully!", newStudent });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const edit_student = async (req, res) => {
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
    let { username, courses, state } = req.body;

    if (plainToken.role == "user") {
      if (username && username != plainToken.username) {
        return res.status(403).json({
          message: "forbidden, you can't edit another student than you!",
        });
      } else if (!username) username = plainToken.username;
      if (!courses || !state) {
        return res
          .status(400)
          .json({ message: "student courses and state are required!" });
      }
    }
    if (!username || !courses || !state) {
      return res.status(400).json({ message: "all fields are required!" });
    }

    let foundStudent = await studentsModel.findOne({
      _id: id,
    });

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }

    let updatedStudent = await studentsModel.findByIdAndUpdate(
      { _id: id },
      { username, courses, state },
      { new: true }
    );
    res.json({
      message: "student with id " + id + " editd successfully!",
      updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

module.exports = {
  getStudents,
  delete_student,
  getStudentByID,
  add_student,
  edit_student,
};
