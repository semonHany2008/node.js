const mongoose=require('mongoose');

const otpSchema=new mongoose.Schema({
    otp:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    createdAt:{type:Date, default:Date.now, expires:300}
});

const otpModel=mongoose.model('otp', otpSchema);
module.exports=otpModel