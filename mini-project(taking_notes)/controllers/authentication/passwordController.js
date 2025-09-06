const { usersModel } = require("../../models/Users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required!" });
    }

    let foundUser = await usersModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "user not found!" });
    }

    let token = crypto.randomBytes(32).toString("hex");
    let hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    foundUser.passwordResetToken = hashedToken;
    foundUser.passwordResetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await foundUser.save();
    res.json({
      message: "Password reset token sent successfully",
      passwordResetToken: token,
    });
  } catch (error) {
    console.log("error sending forgot password request", error);
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { passwordResetToken } = req.query;
    let { newPassword, confirmPassword } = req.body;

    if (!passwordResetToken) {
      return res
        .status(400)
        .json({ message: "Password reset token required!" });
    }
    let hashedToken = crypto
      .createHash("sha256")
      .update(passwordResetToken)
      .digest("hex");

    let foundUser = await usersModel.findOne({
      passwordResetToken: hashedToken,
    });
    if (!foundUser) {
      return res.status(400).json({ message: "user not found!" });
    }

    let activeTokenUser = await usersModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });
    if (!activeTokenUser) {
      return res.status(400).json({ message: "Password reset token expired!" });
    }

    if (newPassword != confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }
    activeTokenUser.password = bcrypt.hashSync(newPassword, 10);
    activeTokenUser.passwordResetToken=null;
    activeTokenUser.passwordResetTokenExpiry=null;
    await activeTokenUser.save();
    res.status(200).json({ message:"password updated successfully!", updatedUser: activeTokenUser });
  } catch (error) {
    console.log("some error happen while reset password", error);
    res
      .status(500)
      .json({ message: "internal server error:", error: error.message });
  }
};

module.exports = { forgotPassword, resetPassword };
