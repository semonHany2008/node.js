const { sessionModel } = require("../../models/session");
const { usersModel } = require("../../models/Users");
const jwt = require("jsonwebtoken");


const enable_otp = async (req, res) => {
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
    // if(plainToken.role=='user'){
    //   return res.json({message:"you're not allowed to control enable otp!"});
    // }
    let {enableOtp}=req.body;
    if(enableOtp==undefined || (typeof enableOtp=="string" && enableOtp.trim()=='')){
        return res.json({message:"Enable OTP is required!"});
    }
    let user = await usersModel.findOne({ username: plainToken.username });
    user.enable_otp=enableOtp;
    await user.save();
    res.json({message:"enable_otp Updated successfully!"});
  } catch (error) {
    console.log("error enabling OTP: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { enable_otp };