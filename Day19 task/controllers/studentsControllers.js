const studentsModel = require("../models/students");
const usersModel = require("../models/users");
const coursesModel = require("../models/courses");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const getStudents = async (req, res) => {
  try {
    if (req.user.role == "user") {
      return res.status(403).json({ message: "forbidden, admin only!" });
    }
    let students = await studentsModel
      .find()
      .populate("enrolled_courses")
      .populate("user")
      .lean();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const getStudentByID = async (req, res) => {
  try {
    let id = req.params.id;
    let foundStudent = await studentsModel
      .findOne({
        _id: id,
      })
      .populate("enrolled_courses")
      .populate("user")
      .lean();

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }

    if (req.user.role == "user" && req.user.username != foundStudent.username) {
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
    let id = req.params.id;

    let foundStudent = await studentsModel.findOne({
      _id: id,
    });

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }

    if (req.user.role == "user" && req.user.username != foundStudent.username) {
      return res
        .status(403)
        .json({ message: "forbidden, you can delete only your own profile!" });
    }
    let deletedStudent = await studentsModel.findByIdAndDelete(id);
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
    let { username, courses } = req.body;
    if (req.user.role == "user") {
      if (username && username != req.user.username) {
        return res.status(403).json({
          message: "forbidden, you can't add another student than you!",
        });
      } else if (!username) username = req.user.username;
      if (!courses) {
        return res
          .status(400)
          .json({ message: "enrolled courses are required!" });
      }
    }
    if (!username || !courses) {
      return res
        .status(400)
        .json({ message: "username and enrolled courses are required!" });
    }

    let foundStudent = await studentsModel.findOne({ username });
    if (foundStudent) {
      return res.json({ message: "student already exist!" });
    }

    let foundUser = await usersModel.findOne({ username });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "this username isn't registered before!" });
    }

    //more efficient than the code snippet [157-166] as it query the database only once.
    let foundCourses = await coursesModel.find({ name: { $in: courses } });
    if (foundCourses.length !== courses.length) {
      return res.status(400).json({ message: "some courses not found!" });
    }
    let enrolled_courses = foundCourses.map((c) => c._id);

    let newStudent = new studentsModel({
      username,
      user: foundUser._id,
      enrolled_courses,
    });
    await newStudent.save();

    res.json({ message: "student added successfully!", newStudent });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", error: err });
  }
};

const edit_student = async (req, res) => {
  try {
    let id = req.params.id;
    let { username, user_data, courses } = req.body;

    if (req.user.role == "user" && req.user.id != id) {
      return res.status(403).json({
        message: "forbidden, you can't edit another student data!",
      });
    }

    if (!username || !user_data || !courses) {
      return res.status(400).json({ message: "all fields are required!" });
    }

    let foundStudent = await studentsModel.findById(id);

    if (!foundStudent) {
      return res.status(400).json({ message: "student not found!" });
    }
    let updatedUser = await usersModel.findOneAndUpdate(
      { username: foundStudent.username },
      user_data,
      { new: true }
    );

    //user can edit courses by add or delete any from its enrolled courses, not to edit course basic data.
    let enrolled_courses = [];
    for (let courseName of courses) {
      let foundCourse = await coursesModel.findOne({ name: courseName });
      if (!foundCourse) {
        return res
          .status(400)
          .json({ message: "course " + courseName + " not found!" });
      }
      enrolled_courses.push(foundCourse._id);
    }

    let updatedStudent = await studentsModel.findByIdAndUpdate(
      id,
      { username, user: updatedUser._id, enrolled_courses },
      { new: true }
    );
    res.json({
      message: "student with id " + id + " edited successfully!",
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
