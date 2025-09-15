const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  if (req.session.token) {
    jwt.verify(req.session.token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "invalid token!" });
      }
      req.user = decoded;
      return next();
    });
  }
  res.status(401).json({ message: "you're not authorized!" });
};

module.exports = checkAuth;
