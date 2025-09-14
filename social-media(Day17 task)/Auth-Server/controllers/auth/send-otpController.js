const usersModel = require("../../models/users");
const otpModel = require("../../models/otp");
const mailSender = require("../../utils/sendMail");

const send_otp = async (req, res) => {
  try {
    let email = req.body.email;
    let foundUser = await usersModel.findOne({ email });
    if (!foundUser) {
      return res.json({ message: "you account not found, try register!" });
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    let newOtp = new otpModel({ email, otp });
    await newOtp.save();
    mailSender(email, "your otp code", `your otp code is ${otp}`);
    res.json({ message: "otp sent to your email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = send_otp;
