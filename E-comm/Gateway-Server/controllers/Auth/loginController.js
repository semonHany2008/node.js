const { fetchPostRequest } = require("../../utils/fetch_server");

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "All inputs are required" });
    }
    const data = await fetchPostRequest("http://127.0.0.1:8080/auth/login", {
      usernameOrEmail,
      password,
    });
    if(data.token){
        req.session.token = data.token;
        return res.json({ message: data.message });
    }
    res.status(401).json({ message: data });
  } catch (err) {
    res.status(500).json({ message: "internal server error", error: err.message });
  }
};

module.exports = { login };
