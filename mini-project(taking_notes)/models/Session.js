const mongoose=require('mongoose');

const sessionSchema=new mongoose.Schema({
    username: {type:String ,required:true},
  token: {type:String ,required:true},
  role: {type:String, enum: ["user", "admin"], default: "user"},
  createdAt: {type:Date, default:Date.now, expires:'1h'}
});

const sessionModel=mongoose.model('session',sessionSchema);
module.exports={sessionModel}