const {usersModel}=require("../models/users")
const {tokenModel}=require('../models/token')
const bcrypt=require('bcrypt')


const login=async(req,res)=>{
    const {username, password}=req.body;
    if(!username || !password)
        return res.end("username and password are required!")
    const foundUser=await usersModel.findOne({username:username})
    if(!foundUser)
        return res.end("user not found!");

    let checkPassword=await bcrypt.compare(password, foundUser.password);
    if(!checkPassword)
        return res.end("invalid password!")

    const addToken=new tokenModel({
        username:foundUser.username,
        email:foundUser.email
    })
    await addToken.save();
    res.json({message:"successful login!"})
}

module.exports={login}