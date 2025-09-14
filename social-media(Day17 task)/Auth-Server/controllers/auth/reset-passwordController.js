const otpModel = require("../../models/otp");
const usersModel = require("../../models/users");

const reset_password = async (req, res) => {
  try {
    let { otp, newPassword, confirmPassword } = req.body;
    let foundOtp = await otpModel.findOne({ otp });
    if (!foundOtp) {
      return res.json({ message: "invalid otp or expired!" });
    }
    let foundUser = await usersModel.findOne({ email: foundOtp.email });
    if (!foundUser) {
      return res.json({ message: "user not found!" });
    }
    if (foundUser.password === newPassword) {
      return res.json({
        message: "new password must be different from old password!",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.json({
        message: "new password and confirm password not match!",
      });
    }
    foundUser.password = newPassword;
    await foundUser.save();
    await otpModel.findOneAndDelete({ otp });
    res.json({ message: "password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = reset_password;
