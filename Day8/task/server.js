// Express Server Entry Point
const express = require("express");
const {
  loadTasks,
  loadUsers,
  saveTasks,
  saveUsers,
} = require("d:/Node.js/Day8/task/bouns");

const path = require("path");
const app = express();
const PORT = 6060;

// Local Database
let tasks = [];
let users = [];

tasks = loadTasks(tasks, path.join(__dirname, "data", "tasks.json"));
users = loadUsers(users, path.join(__dirname, "data", "users.json"));

// Middleware
app.use(express.json());

// Routes
app.get("/api/tasks", (req, res) => {
  // should get all tasks from tasks array
  if (tasks.length === 0) return res.json({ warning: "tasks are empty" });
  res.json({ tasks });
});

app.get("/api/tasks/search", (req, res) => {
  // query string should contain keyword and we should search in tasks array using this keyword
  // If the keyword exists on title or description we should respond with this task
  let keyword = req.query.keyword;
  for (let task of tasks) {
    if (task.title.includes(keyword) || task.description.includes(keyword)) {
      return res.json({ searchedTask: task });
    }
  }
  return res.end("No task with this keyword was found!");
});

app.post("/api/tasks", (req, res) => {
  // body should contain these info title, description, priority(high, low, medium)
  let task = req.body;
  if (!task.title || !task.description || !task.priority) {
    return res.json({
      warning: "task added should contain title, description and priority!",
    });
  }
  tasks.push(task);
  res.json({ message: "task added successfully", task });
  // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
  saveTasks(tasks, path.join(__dirname, "data", "tasks.json"));
});

app.get("/profile", (req, res) => {
  // we get query string from req and search user in users array
  let username = req.query.username;
  let foundUser = users.find((user) => user.username == username);
  if (!foundUser) {
    return res.json({ warning: "user not found!" });
  }
  res.json({ foundUser });
});

app.post("/register", (req, res) => {
  // body should contain these info username, email, password
  let newUser = req.body;
  if (!newUser.username || !newUser.email || !newUser.password) {
    return res.end("username, email and password all are required!");
  }
  let foundUser = users.find(
    (user) => user.email == newUser.email || user.username == newUser.username
  );
  if (foundUser) {
    return res.end("you're already registered, try login!");
  }
  users.push(newUser);
  res.end("user added successfully!");

  // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
  saveUsers(users, path.join(__dirname, "data", "users.json"));
});

app.post("/login", (req, res) => {
  // body should contain these info username or email, password
  let loginInfo = req.body;
  if ((!loginInfo.email && !loginInfo.username) || !loginInfo.password) {
    return res.end("username or email and password are required!");
  }
  let foundUser = users.find(
    (user) =>
      (user.email == loginInfo.email || user.username == loginInfo.username) &&
      user.password == loginInfo.password
  );
  if (!foundUser) {
    return res.status(404).end("user not found, try register!");
  }
  res.end("successful login!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
