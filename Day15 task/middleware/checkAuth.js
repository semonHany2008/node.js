const checkAuth = (req, res, next) => {
  if (req.session.token) 
    return next();
  res.status(401).json({ message: "you're not authorized!" });
};

module.exports = checkAuth;
