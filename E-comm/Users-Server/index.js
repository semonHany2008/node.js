const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const { connectDB } = require("./config/connDB");
const usersRouter = require("./router/usersRouter");
const check_req = require("./middleware/check_req");
const path = require("path");
require("dotenv").config(path.join(__dirname, "./.env"));

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, htppOnly: true, secure: false },
  })
);
app.use(check_req);

connectDB();

app.use("/users", usersRouter);

mongoose.connection.once("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server started on port 3000");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
