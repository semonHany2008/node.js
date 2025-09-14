//config .env file
require('dotenv').config();

//require libraries and connectdb function
const cors=require('cors');
const mongoose=require('mongoose');
const connectDB=require('./config/connectdb');

//require router
const reelsRouter=require('./router/reelsRouter');

//create express server
const express = require("express");
const app = express();

app.use(express.json());

//cors setting
let allowedURLs = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5000",
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


app.use("/reels", reelsRouter);

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