const express=require('express');
const authRouter=express.Router();
const {login}=require("../controllers/auth/loginController.js");
const {renderLogin}=require("../controllers/auth/renderLoginController.js");
const {renderRegister}=require("../controllers/auth/renderRegisterController.js");
const {register}=require("../controllers/auth/registerController.js");


authRouter.get('/login',renderLogin);
authRouter.post('/login',login);
authRouter.get('/register',renderRegister);
authRouter.post('/register',register);

module.exports=authRouter;