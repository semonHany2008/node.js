const fetchPostUpdate = require("../../utils/fetch_post_update");

const register = async (req, res) => {
  try {
    let { firstName, lastName, username, password, email, phone, role } = req.body;
    if (!firstName || !lastName || !username || !password || !email) {
      return res
        .status(400)
        .json({ message: "all fields except phone are required!" });
    }
    let data = await fetchPostUpdate(
      "http://127.0.0.1:3000/auth/register",
      "POST",
      undefined,
      req.body
    );
    if (data.token) {
      req.session.token = data.token;
      return res.json({ message: data.message });
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = register;
