const {
  loadLoggedInUser,
  loadTasks,
  loadUsers,
  saveTasks,
  saveUsers,
  saveLoggedInUser,
} = require("./utils.js");

// Express Server Entry Point
const express = require("express");
const app = express();
const PORT = 6060;
const path = require("path");

// Local Database
let tasks = [];
let users = [];

loadTasks(tasks, path.join(__dirname, "data", "tasks.json"));
loadUsers(users, path.join(__dirname, "data", "users.json"));
const loggedInUSer = loadLoggedInUser(
  path.join(__dirname, "data", "loggedInUser.json")
);

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

// YOU MUST BE LOGGED IN TO DO IT
app.post("/api/tasks", (req, res) => {
  // body should contain these info title, description
  // priority(high, low, medium) + the username who created the task
  if (!loggedInUSer) {
    return res.end("you must be loggedIn first!");
  }
  let task = req.body;
  if (!task.title || !task.description || !task.priority) {
    return res.json({
      warning: "task added should contain title, description and priority!",
    });
  }
  const tasksIds = tasks.map((task) => task.id);
  task.id = Math.max(...tasksIds) + 1;
  task.username = loggedInUSer.username;
  tasks.push(task);
  res.json({ message: "task added successfully", tasks });
  // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
  saveTasks(tasks, path.join(__dirname, "data", "tasks.json"));
});

// YOU MUST BE LOGGED IN TO DO IT OR YOU ARE THE CREATOR OF THE TASK
app.delete("/api/tasks/", (req, res) => {
  // request should contain id of task to delete
  const id = req.query.id;
  if (!id) {
    return res.end("you must enter the task-id in the query");
  }
  let task = tasks.find((task) => task.id == id);
  if (!task) {
    return res.end(`the task with id ${id} not found!`);
  }
  if (!loggedInUSer || task.username != loggedInUSer.username) {
    return res.end(
      "you must be loggedIn and the creator of this task to be able to delete it!"
    );
  }
  tasks = tasks.filter((task) => task.id != id);
  res.json({ message: "task deleted!", tasks });
  // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
  saveTasks(tasks, path.join(__dirname, "data", "tasks.json"));
});

app.get("/profile", (req, res) => {
  // we get query string from req and search user in users array
  let username = req.query.username;
  if (!username) {
    return res.end("you must provide username in the query!");
  }
  let user = users.find((user) => user.username == username);
  if (!user) {
    return res.end("user not Found!");
  }
  res.json({ message: "Hello, " + req.query.username, user });
});

// YOU MUST BE LOGGED IN AND HAVE ADMIN ROLE TO DO IT
app.delete("/profile", (req, res) => {
  // we get query string from req and search user in users array then delete this user
  let username = req.query.username;
  if (!username) {
    return res.end("you must provide the username!");
  }
  let user = users.find((user) => user.username == username);
  if (!user) {
    return res.end("user not Found!");
  }
  if (loggedInUSer.role == "USER" && loggedInUSer.username !== username) {
    return res.end(
      "forbidden, only admin and the user of this profile can delete it!"
    );
  }
  users.splice(users.indexOf(user), 1);
  res.json({ message: "profile deleted!", users });
  saveUsers(users, path.join(__dirname, "data", "users.json"));
});

app.post("/register", (req, res) => {
  // body should contain these info username, email, password, role (ADMIN or USER)
  let newUser = req.body;
  if (
    !newUser.username ||
    !newUser.email ||
    !newUser.password ||
    !newUser.role
  ) {
    return res.end("username, email, password and role all are required!");
  }
  let foundUser = users.find(
    (user) => user.email == newUser.email || user.username == newUser.username
  );
  if (foundUser) {
    return res.end("you're already registered, try login!");
  }
  users.push(newUser);
  res.json({ message: "user added successfully!", users });

  // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
  saveUsers(users, path.join(__dirname, "data", "users.json"));
});

app.post("/login", (req, res) => {
  // body should contain these info username or email, password
  // After logging user data will be saved into a file named "data/loggedInUser.json"
  // And we will use this file to check authentication for users in specifiec routes
  if ((!req.body.username && !req.body.email) || !req.body.password) {
    return res.end("username (or email) and password are required!");
  }
  const user = users.find(
    (user) =>
      user.username === req.body.username || user.email === req.body.email
  );
  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }
  if (user.password !== req.body.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.end("successful LogIn process!");
  saveLoggedInUser(user, path.join(__dirname, "data", "loggedInUser.json"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
