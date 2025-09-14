//config .env file
require("dotenv").config();

//require libraries and connectdb function
const cors = require("cors");
const session = require("express-session");

//require routers
const authRouter = require("./router/authRouter");
const postsRouter = require("./router/postsRouter");
const reelsRouter = require("./router/reelsRouter");
const groupsRouter = require("./router/groupsRouter");

//create express server
const express = require("express");
const app = express();

app.use(express.json());

//cors setting
let allowedURLs = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4000",
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

//session setting
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false },
  })
);

//use routers for the main pathes
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/reels", reelsRouter);
app.use("/groups", groupsRouter);

//run the server
app.listen(process.env.PORT, () => {
  console.log("Gateway server running on port " + process.env.PORT);
});
