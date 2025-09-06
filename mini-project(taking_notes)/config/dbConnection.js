const mongoose=require('mongoose')
const path=require('path')
require('dotenv').config({path:path.join(__dirname,'../.env')})

const dbConnection=async ()=>{
    mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connected!...");
}

module.exports=dbConnection;