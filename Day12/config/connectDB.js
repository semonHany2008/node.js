const mongoose=require('mongoose');
const path=require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')})

const DBconnection=()=>{
    try{
    mongoose.connect(process.env.MONGO_URL);
    console.log('mongoDB connected...');
    }
    catch(err){
        console.log(err);
    }
}

module.exports={DBconnection}