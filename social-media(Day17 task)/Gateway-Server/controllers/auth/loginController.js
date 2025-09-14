const fetchPostUpdate = require("../../utils/fetch_post_update");

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required!" });
    }
    let data = await fetchPostUpdate(
      "http://127.0.0.1:3000/auth/login",
      "POST",
      undefined,
      req.body
    );
    if (data.token) {
      req.session.token = data.token;
      return res.json({ message: data.message });
    }
    res.json({ message: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = login;
