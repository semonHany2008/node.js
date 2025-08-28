const { app } = require("./index.js");
const { home } = require("./controllers/homeController.js");
const { profile } = require("./controllers/profileController.js");

app.get("/", home);

app.get("/profile/:name", profile);
