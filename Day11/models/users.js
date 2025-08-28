const mongoose=require('mongoose');

const usersSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:String,
    age:Number,
    email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true, versionKey:false});

const usersModel=mongoose.model('users', usersSchema);
module.exports={usersModel}