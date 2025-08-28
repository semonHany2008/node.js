const path=require('path');
const mongoose=require('mongoose');
require('dotenv').config({path:path.join(__dirname,'../.env')});

const connectdb=async ()=>{
    try{
        await  mongoose.connect(process.env.mongoDB_URL);
        console.log("database connected!");
    }catch(err){
        console.log("error connecting database: ",err);
    }
}

module.exports={connectdb}