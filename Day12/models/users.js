const mongoose=require('mongoose');
const usersSchema=new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    age:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    }
})

const usersModel=mongoose.model('users',usersSchema);
module.exports={usersModel}