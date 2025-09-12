const express = require('express');
const session = require('express-session');
require('dotenv').config()
const cors = require('cors');
const authRouter = require('./router/authRouter');
const usersRouter = require('./router/usersRouter');
const path = require("path");
require("dotenv").config({path:path.join(__dirname, "./.env")});


const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60*60*24,
        httpOnly: true
    }
}))

app.use('/auth', authRouter)
app.use('/users', usersRouter)



app.listen(process.env.PORT, () => {
    console.log(`Gateway Server is running on port ${process.env.PORT}...........`);
});