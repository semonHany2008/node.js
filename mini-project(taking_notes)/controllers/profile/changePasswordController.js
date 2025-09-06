const { sessionModel } = require("../../models/session");
const { usersModel } = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const changePassword = async (req, res) => {
  try {
    let token = req.headers.token;
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

    let {oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "oldPassword, newPassword and confirmPassword are required!",
      });
    }

    let user = await usersModel.findOne({ username: plainToken.username });
    if(!user){
        return res.status(404).json({message:"User not found!"});
    }
    let checkOldPass=await bcrypt.compare(oldPassword, user.password);
    if(!checkOldPass){
        return res.status(400).json({message:"Old password is incorrect!"});
    }
    
    if(newPassword != confirmPassword){
        return res.status(400).json({message:"Passwords do not match!"});
    }
    user.password=bcrypt.hashSync(newPassword,10);
    await user.save();
    res.json({message:"password Updated successfully", newPassword:user.password});
  } catch (error) {
    console.log("error changing password: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { changePassword };
