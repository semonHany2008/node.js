const mongoose=require('mongoose');

const usersSchema=new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String},
    role:{type:String, enum:['user', 'admin'], default:'user'}
});

const usersModel=mongoose.model('users', usersSchema);
module.exports=usersModel