const usersModel=require('../models/users');

const registerControlller=async (req, res)=>{
    const {firstName, lastName, age, email, password}=req.body;
    if(!firstName||! lastName||! age||! email||! password)
        return res.status(400).json({message:"all fields are required!"});
    const foundUser=await usersModel.findOne({email:email});
    if(foundUser)
        return res.status(400).json({message:"this email is already used!"});

    let newUser=new usersModel({
        firstName, lastName, age, email, password
    })//create new raw in this model (table)
    await newUser.save();
    res.status(201).json({message:"successful registeration!"});//statuscode 201 means successful and created
}

module.exports={registerControlller}