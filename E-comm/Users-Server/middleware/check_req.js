const jwt = require("jsonwebtoken");

const check_req = async (req, res, next) => {
  try {
    const { username, password, token } = req.headers;
    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "unauthorized, missed headers auth properties!" });
    }
    if (
      username !== process.env.USERNAME_SERVER ||
      password !== process.env.PASSWORD_SERVER
    ) {
      return res
        .status(401)
        .json({ message: "unauthorized, invalid auth headers properties!" });
    }
    if (!token) {
      return res.status(401).json({ message: "unauthorized, login first!" });
    }

    console.log("secret before verify: ",process.env.JWT_SECRET, "length: ",token?.length );
    await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: error.message });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (err) {
    res.status(500).json({ message: "internal server error", error: err.message });
  }
};

module.exports = check_req;
