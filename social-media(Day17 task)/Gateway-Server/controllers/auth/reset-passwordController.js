const fetchPostUpdate = require("../../utils/fetch_post_update");

const reset_password = async (req, res) => {
  try {
    let { otp, newPassword, confirmPassword } = req.body;
    if (!otp || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "all fields are required!" });
    }
    let data = await fetchPostUpdate(
      "http://127.0.0.1:3000/auth/reset-password",
      "PATCH",
      undefined,
      req.body
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = reset_password;
