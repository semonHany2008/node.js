const mongoose=require('mongoose');
const path=require('path');
require('dotenv').config({path:path.join(__dirname,"../.env")});

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("server connected to mongodb!");
    }catch(err){
        console.log(err);
    }
}

module.exports=connectDB;