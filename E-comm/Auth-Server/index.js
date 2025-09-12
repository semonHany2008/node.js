const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/connDB');
const authRouter = require('./router/authRouter');
const {checkReq} = require('./middleware/checkREQ');
const session=require('express-session');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:1000*60*60*24
    }
}))
app.use(checkReq);

connectDB();




app.use('/auth', authRouter)




mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server started on port '+ process.env.PORT);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
});