const { usersModel } = require("../../models/Users");
const { sessionModel } = require("../../models/session");
const { categoriesModel } = require("../../models/Categories");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const register = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let newUser = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "username, email and password are required!",
      });
    }

    let foundUser = await usersModel.findOne({ username });
    if (foundUser) {
      return res.status(400).json({ message: "this account already exist, try login!" });
    }
    newUser.password=bcrypt.hashSync(password,10);
    let user=await usersModel.create({ ...newUser });
    await categoriesModel.create({ name: "general", ownerUsername: username });
    let token=jwt.sign({username, role:user.role}, "key");
    let session=await sessionModel.create({username, token, role:user.role});
    res.json({
      message:"successful registeration!",
      session,
      user
    });
  } catch (error) {
    console.log("error in registeration request: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { register };
