const express=require('express');
const usersRouter=express.Router();

const {getUsers, delete_user, getUserByID, add_user, edit_user}=require("../controllers/usersControllers");
const checkAuth=require('../middleware/checkAuth');


usersRouter.get('/allUsers', checkAuth, getUsers);
usersRouter.get('/:id', checkAuth, getUserByID);
usersRouter.post('/add-user', checkAuth, add_user);
usersRouter.put('/edit-user', checkAuth, edit_user);
usersRouter.delete('/:id', checkAuth, delete_user);

module.exports=usersRouter;