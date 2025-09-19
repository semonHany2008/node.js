const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  otp:{type:String, default:null},
  otpExpiry:{type:Date, default:null}
});

const usersModel=mongoose.model('users', usersSchema);
module.exports=usersModel;