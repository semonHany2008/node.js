const {
  loadUsers,
  saveLoggedInUser,
  loadStudents,
} = require("../FS_operations");

const postLogin = (req, res) => {
  const users = loadUsers();
  const students = loadStudents();
  // if (!req.body.username || !req.body.email || !req.body.password || !req.body.role || !req.body.fullName || !req.body.password) {
  if (!req.body.username || !req.body.password) {
    return res.render("login", {
      message: "username and password are required!",
    });
  }
  const user = users.find((user) => user.username === req.body.username);
  if (!user) {
    return res.render("login", { message: "User Not Found" });
  }
  if (user.password !== req.body.password) {
    return res.render("login", { message: "Invalid credentials" });
  }
  saveLoggedInUser(user);

  let recentStudents = students.filter((std) => std.status == "active");
  let statusArr = students.map((std) => std.status);

  const active = 0,
    graduated = 0;
  for (let i = 0; i < statusArr.length; i++) {
    if (statusArr[i] == "active") active++;
    else if (statusArr[i] == "graduated") graduated++;
  }

  let stats = { total: statusArr.length, active, graduated };

  res.json({success:true, stats, recentStudents });
};

module.exports = { postLogin };
