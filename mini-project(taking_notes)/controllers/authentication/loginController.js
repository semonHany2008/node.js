const { usersModel } = require("../../models/Users");
const { sessionModel } = require("../../models/session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login_start = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required!" });
    }

    let foundUser = await usersModel.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({ message: "username not found!" });
    }

    let matchPassword = bcrypt.compareSync(password, foundUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "wrong password!" });
    }

    let foundSession = await sessionModel.findOne({ username });
    if (foundSession) {
      return res.status(400).json({ message: "you already logged in!" });
    }

    if(!foundUser.enable_otp){
      const token = jwt.sign({ username, role: foundUser.role }, "key");

      const session = new sessionModel({
        username,
        token,
        role: foundUser.role,
      });

      await session.save();
      return res.json({
        message: "Login successful",
        foundUser,
        session,
      });
    }

    const otp_num = Math.floor(Math.random() * 900000) + 100000;
    foundUser.otp = otp_num.toString();
    foundUser.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await foundUser.save();
    res.json({ message: "OTP sent successfully", foundUser });
  } catch (error) {
    console.log("error in start login", error);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const login_verify = async (req, res) => {
  try {
    let { username, otpCode } = req.body;
    if (!username || !otpCode) {
      return res
        .status(400)
        .json({ message: "username and otpCode are required!" });
    }
    // let active_otp=await usersModel.findOne({otpExpiry:{$gt:otpStartingDate}});
    // if(!active_otp){
    //     return res.status(401).json({message:"No active OTP!"});
    // }

    let foundUser_otp = await usersModel.findOne({
      otp: otpCode,
      otpExpiry: { $gt: Date.now() }, //👉 When you compare a Date field with a number, MongoDB automatically converts the number into a Date internally.
    });
    if (!foundUser_otp) {
      return res.status(401).json({ message: "Invalid or expired OTP!" });
    }

    const token = jwt.sign({ username, role: foundUser_otp.role }, "key");

    const session = new sessionModel({
      username,
      token,
      role: foundUser_otp.role,
    });

    await session.save();
    foundUser_otp.otp=null;
    foundUser_otp.otpExpiry=null;
    await foundUser_otp.save();
    res.json({
      message: "Login successful",
      user: foundUser_otp,
      session,
    });
  } catch (error) {
    console.log("error verifying login", error);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = { login_start, login_verify };
