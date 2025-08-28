const {usersModel}=require("../models/users")
const {tokenModel}=require('../models/token')
const bcrypt=require('bcrypt')


const register=async(req,res)=>{
    try{
    let {firstName, lastName, username, age, email, password, role}=req.body;
    if(!firstName||! lastName||! username||! age||! email||! password)
        return res.end("all fields are required!")
    if(!role){
        role='user';
    }
    const foundUser=await usersModel.findOne({username, email})
    if(foundUser)
        return res.status(400).end("you already registered, try login!");

    if(password.length<6)
        return res.json({message:"password must be 6 characters at least!"});
    let hashedPassword=await bcrypt.hash(password, 10);
    req.body.password=hashedPassword;
    const addedUser=new usersModel(req.body);
    await addedUser.save();
    const addedToken=new tokenModel({
        username:username,
        email:email
    })//we doesn't put createdAt property again or it will throw error as it's already set in the schema
    await addedToken.save();
    res.json({message:"profile created successfully!"});
}
catch(error){
    res.json({message:error.message})
}
}

module.exports={register}