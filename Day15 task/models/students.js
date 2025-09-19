const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  courses:[{name:{type:String, required:true}, creditHours:{type:Number, required:true}}],
  state:{type:String}
});

const studentsModel=mongoose.model('students', studentsSchema);
module.exports=studentsModel;