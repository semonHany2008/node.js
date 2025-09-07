const express=require('express');
const usersRouter=express.Router();
const {getusers}=require("../controllers/users/getUsers.js");
const {addUser}=require("../controllers/users/addUserController.js");


usersRouter.get('/users',getusers);
usersRouter.post('/new',addUser);

module.exports=usersRouter;