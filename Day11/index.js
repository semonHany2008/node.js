const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const {connectdb}=require('./config/DBconnection')
require('dotenv').config({path:path.join(__dirname,'./.env')});

const app=express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));

connectdb();
mongoose.connection.once('connected',()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server running! on port${process.env.PORT}...`)
    })
})