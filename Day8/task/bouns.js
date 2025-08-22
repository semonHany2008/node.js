const fs = require("fs");

function loadUsers(users, dbFile) {
  users = JSON.parse(fs.readFileSync(dbFile));
  return users;
}

function loadTasks(tasks, dbFile) {
  tasks = JSON.parse(fs.readFileSync(dbFile));
  return tasks;
}

function saveTasks(tasks, dbFile) {
  fs.writeFileSync(dbFile, JSON.stringify(tasks));
}

function saveUsers(users, dbFile) {
  fs.writeFileSync(dbFile, JSON.stringify(users));
}

module.exports = {
  loadUsers,
  loadTasks,
  saveTasks,
  saveUsers,
};
