const fs = require("fs");
/**
 * Load tasks from JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadTasks(tasks, dbFile) {
  try {
    let loadedTasks = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    tasks.push(...loadedTasks);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Save tasks to JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveTasks(tasks, dbFile) {
  fs.writeFileSync(dbFile, JSON.stringify(tasks), "utf-8");
}

/**
 * Load users from JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadUsers(users, dbFile) {
  try {
    let loadedUsers = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    users.push(...loadedUsers);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Save users to JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveUsers(users, dbFile) {
  fs.writeFileSync(dbFile, JSON.stringify(users), "utf-8");
}

/**
 * This function will save logged in user to a file named "data/loggedInUser.json"
 *
 * @param {{username: string, email: string, role: 'ADMIN' | 'USER'}} user
 *     This is the user object that will be saved to the file
 */
function saveLoggedInUser(user, dbFile) {
  fs.writeFileSync(dbFile, JSON.stringify(user));
}

/**
 * This function will load logged in user from a file named "data/loggedInUser.json"
 * if file does not exist or file is empty it will return null
 *
 * @returns {{username: string, email: string, role: 'ADMIN' | 'USER'} | null} user
 *     This is the user object that will be loaded from the file or null
 *     if file does not exist or file is empty
 */
function loadLoggedInUser(dbFile) {
  const loggedInUser = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
  if (!loggedInUser) return null;
  return loggedInUser;
}

module.exports = {
  loadLoggedInUser,
  loadTasks,
  loadUsers,
  saveLoggedInUser,
  saveTasks,
  saveUsers,
};
