const { sessionModel } = require("../../models/session");

const logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = req.headers.token || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "no token provided!" });
    }

    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }

    await sessionModel.deleteOne({ token });
    res.json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("error logging out!", error);
    res.status(500).json({ message: "can't logout!", error: error.message });
  }
};


module.exports = { logout };
