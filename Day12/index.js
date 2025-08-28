const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const {DBconnection}=require('./config/connectDB')
require('dotenv').config({path:path.join(__dirname,'./.env')});

const app=express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));

DBconnection();

mongoose.connection.once('connected',()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server running! on port${process.env.PORT}...`)
    })
})

mongoose.connection.on('error',()=>{
    console.log("error connecting mongoDB!")
})

module.exports={app}