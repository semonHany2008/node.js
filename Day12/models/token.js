const mongoose=require('mongoose');
const { type } = require('os');

const tokenSchema=new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires:300
    }
})

const tokenModel=mongoose.model('token',tokenSchema);
module.exports={tokenModel}