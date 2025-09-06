const { sessionModel } = require("../../models/session");
const { usersModel } = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const change_first_last_name = async (req, res) => {
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
    if(!Object.keys(req.body).length)
        return res.json({message:"you must provide one at least of first or last name new value!"});

    let {firstName, lastName } = req.body;
    let user = await usersModel.findOne({ username: plainToken.username });
    let updatedNames={};
    if(firstName){
        user.firstName=firstName;
        updatedNames.firstName=firstName;
    }
    if(lastName){
        user.lastName=lastName;
        updatedNames.lastName=lastName;
    }
    await user.save();
    res.json({message:"name Updated successfully",...updatedNames});
  } catch (error) {
    console.log("error changing first-last-name: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { change_first_last_name };
