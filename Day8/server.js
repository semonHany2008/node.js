const express = require("express");
const app = express();
const fs = require("fs");
let usersData = JSON.parse(fs.readFileSync("./usersData.json"));

app.use(express.json());

app.get("/login", (req, res) => {
  res.send("hello in my website!");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return res.end("username and password are required!");
  }
  if (usersData[username] && usersData[username].password === password) {
    return res.json({
      message: "successful login!",
      "your data": usersData[username],
    });
  }
});

app.post("/register", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;

  if (!username || !password || !email) {
    return res.end("username, password and email all are required!");
  }
  if (usersData[username]) {
    return res.send("you already have an account, try sign in!");
  }
  newUser = { username, password, email };
  usersData[username] = newUser;
  fs.writeFileSync("./usersData.json", usersData);
  res.json({ message: "you added successfully!", "your data": newUser });
});

app.get("/profile", (req, res) => {
  res.json({ message: "Hello, " + req.query.username });
});

app.listen(3000, () => {
  console.log("express server is running on port 3000...");
});

//task
app.post("/newUser", (req, res) => {
  let usersData = JSON.parse(fs.readFileSync("./usersData.json"));
  let newUser = req.body;
  if (!newUser.username || !newUser.password || !newUser.email) {
    return res.end("username, email and password all are required!");
  }
  usersData[newUser.username] = newUser;
  fs.writeFileSync("usersData.json", JSON.stringify(usersData));
  res.status(200).json({
    message: "user added successfully! ",
    data: usersData[newUser.username],
  });
});

app.get("/existingUser", (req, res) => {
  let usersData = JSON.parse(fs.readFileSync("./usersData.json"));
  let username = req.query.username;
  if (!usersData[username])
    return res.json({ message: `the user ${username} not found!` });
  res.json({ message: "user found!", user: usersData[username] });
});

app.get("/getUserData", (req, res) => {
  let usersData = JSON.parse(fs.readFileSync("./usersData.json"));
  let username = req.query.username;
  if (!usersData[username]) return res.end(`the user ${username} not found!`);
  res.json({ user: usersData[username] });
});
