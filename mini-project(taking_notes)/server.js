const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const dbConnection=require("./config/dbConnection")
require('dotenv').config({path:path.join(__dirname,"./.env")});

app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"./public")))

dbConnection();
mongoose.connection.once("connected",()=>{
    app.listen(process.env.PORT,()=>{
    console.log("express server is running...")
})
})

mongoose.connection.on("error",()=>{
    console.log("error connecting mongoDB atlas!")
})

module.exports={app}