const { fetchServer } = require("../../utils/fetch_server");

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "All inputs are required" });
    }
    const data = await fetchServer("http://127.0.0.1:3000/auth/login", "POST", {
      usernameOrEmail,
      password,
    });
    if(data.token){
        req.session.token = data.token;
        res.json({ message: data });
    }
    res.status(401).json({ message: data });
  } catch (err) {
    res.status(500).json({ message: "internal server error", error: err.message });
  }
};

module.exports = { login };
