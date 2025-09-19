const express = require("express");
const mongoose=require('mongoose');
const app = express();
const path = require("path");
const { connectDB } = require("./config/connectDB.js");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// app.listen(3000, () => {
//   connectDB();
//   console.log("server running on port 3000...");
// });

connectDB();
mongoose.connection.once('connected',()=>{
    app.listen(3000, () => {
  console.log("server running on port 3000...");
});
})//enable connecting the database before running the server

module.exports = { app };
