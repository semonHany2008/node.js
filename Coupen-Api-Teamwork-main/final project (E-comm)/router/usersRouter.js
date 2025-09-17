const express = require("express");
const usersRouter = express.Router();

const {
	getusers,
	delete_user,
	change_password,
} = require("../controllers/usersControllers");
const checkAuth = require("../middleware/checkAuth");

usersRouter.get("/all-users", checkAuth, getusers);
usersRouter.put("/change-password", checkAuth, change_password);
usersRouter.delete("/delete-user", checkAuth, delete_user);

module.exports = usersRouter;
