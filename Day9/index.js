const express = require("express");
const app = express();

app.use(express.json());

const path = require("path");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

const fs = require("fs");

let users = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "Day8", "task", "data", "users.json")
  )
);

function saveUsers() {
  fs.writeFileSync(
    path.join(__dirname, "..", "Day8", "task", "data", "users.json"),
    JSON.stringify(users)
  );
}

app.delete("/api/user", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.end("username and password are required!");
  }
  let foundUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!foundUser) {
    return res.status(404).end("user not found!");
  }
  users.splice(users.indexOf(foundUser), 1);
  saveUsers();
  // users=users.filter((user)=>user.username!==foundUser.username);
  res.json({ message: "user deleted successfully", users });
});

app.patch("/api/user/username", (req, res) => {
  const { username, newUsername } = req.body;
  if (!username || !newUsername) {
    return res.end("username and newUsername are required!");
  }
  let foundUserIndex = users.findIndex((user) => user.username === username);
  if (foundUserIndex == -1) {
    return res.status(404).end("user not found!");
  }
  users[foundUserIndex].username = newUsername;
  saveUsers();
  res.json({ message: "username updated successfully!", users });
});

app.get("/", (req, res) => {
//   fs.readFile("home.html", "utf-8", (err, data) => {
//     if (err) {
//       return res.end("can't read html file!");
//     }
//     res.send(data);
//   });
res.render('home.ejs',{username:"Semon Hany"})
}); 

app.all(/.*/, (req, res) => {
  res.json({ message: "404 page not found!" });
});

app.listen(3000, () => {
  console.log("express server running!...");
});
