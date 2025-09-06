const { sessionModel } = require("../../models/session");
const { usersModel } = require("../../models/Users");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
  try {
    let token = req.headers.token || req.query.token;
    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }
    let plainToken;
    try {
      plainToken = jwt.verify(token, "key");
    } catch (error) {
      return res.status(401).json({ message: "invalid or expired token!" });
    }
    let profile = await usersModel.findOne({ username: plainToken.username });
    // res.json(profile);
    res.render('profile.ejs',{profile});
  } catch (error) {
    console.log("error entering profile: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { getProfile };
