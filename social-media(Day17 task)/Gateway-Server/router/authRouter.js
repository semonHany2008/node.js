//require auth controllers
const login=require("../controllers/auth/loginController")
const register=require("../controllers/auth/registerController")
const reset_password=require("../controllers/auth/reset-passwordController")
const send_otp=require("../controllers/auth/send-otpController")

//create router
const express=require('express');
const router=express.Router();

//set auth endPoints
router.post("/login", login);
router.post("/register", register);
router.patch("/reset-password", reset_password);
router.post("/send-otp", send_otp);


module.exports=router