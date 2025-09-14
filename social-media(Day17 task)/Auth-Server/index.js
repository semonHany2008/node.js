//config .env file
require('dotenv').config();

//require libraries, connectdb function and middleware
const cors=require('cors');
const mongoose=require('mongoose');
const connectDB=require('./config/connectdb');
const check_req=require('./middleware/check_req');

//require authRouter
const authRouter=require('./router/authRouter');

//create express server
const express = require("express");
const app = express();

app.use(express.json());
app.use(check_req);

//cors setting
let allowedURLs = [
  "http://127.0.0.1:5000",
  "http://127.0.0.1:4000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:6000",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedURLs.includes(origin))
        return callback(null, origin);
      callback("nt allowed by cors");
    },
    credentials: true,
  })
);


app.use("/auth", authRouter);

//connect mongodb
connectDB();

mongoose.connection.once('connected',()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Gateway server running on port "+process.env.PORT);
    })
})

mongoose.connection.on('error',()=>{
    console.log("error connecting to mongodb");
})