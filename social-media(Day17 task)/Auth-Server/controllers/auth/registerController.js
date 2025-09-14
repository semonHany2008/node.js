const usersModel = require("../../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    let { firstName, lastName, username, password, email, phone, role } =
      req.body;
    let foundUser = await usersModel.findOne({
      $or: [{ username }, { email }],
    });
    if (foundUser) {
      return res.json({ message: "username or email already used!" });
    }
    if(password.length<6){
      return res.json({message:"password must be at least 6 characters!"});
    }
    if (!["user", "admin"].includes(role)) {
      return res.json({ message: "role must be user or admin!" });
    }
    if(['gmail.com', 'yahoo.com', 'hotmail.com'].includes(email.split('@')[1])==false){
      return res.json({message:"email must be gmail, yahoo or hotmail!"});
    }
    let hashPassword = bcrypt.hashSync(password, 10);
    let newUser = new usersModel({
      firstName,
      lastName,
      username,
      password: hashPassword,
      email,
      phone,
      role,
    });
    await newUser.save();
    let token = jwt.sign(
      {id:newUser._id, username, role, firstName, lastName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "register done!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = register;
