//config .env file
require('dotenv').config();

//require libraries, middleware and connectdb function
const cors=require('cors');
const mongoose=require('mongoose');
const check_auth=require('./middleware/checkAuth');
const connectDB=require('./config/connectdb');

//require router
const groupsRouter=require('./router/groupsRouter');

//create express server
const express = require("express");
const app = express();

app.use(express.json());
app.use(check_auth);

//cors setting
let allowedURLs = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:3001",
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


app.use("/groups", groupsRouter);

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