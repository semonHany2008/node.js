const usersModel = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let foundUser = await usersModel.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({ message: "you account not found, try register!" });
    }
    let checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "wrong password!" });
    }
    let token = jwt.sign(
      { id:foundUser._id ,username, role:foundUser.role, firstName:foundUser.firstName, lastName:foundUser.lastName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "login done!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = login;
