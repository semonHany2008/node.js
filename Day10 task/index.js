const express = require("express");
const app = express();
const path = require("path");

// app.use(express.json());
app.use(express.urlencoded({ extended: true })); //enable accepting data sent from the form

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.listen(3000, () => {
  console.log("server running on port 3000...");
});

module.exports = { app };
