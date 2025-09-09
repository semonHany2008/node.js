const express=require('express');
const authRouter=express.Router();

const {login, logout, register, forgot_password, send_otp}=require("../controllers/authControllers");
const checkAuth=require('../middleware/checkAuth');

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/forgot-password', forgot_password);
authRouter.post('/send-otp', send_otp);
authRouter.delete('/logout', checkAuth, logout);

module.exports=authRouter;