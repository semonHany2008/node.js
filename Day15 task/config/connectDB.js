const mongoose=require('mongoose');
const path=require('path');
require('dotenv').config({path:path.join(__dirname,"../.env")});

const connectDB=async()=>{
    await mongoose.connect(process.env.Mongo_URL);
    console.log("server connected to mongodb!");
}

module.exports=connectDB;