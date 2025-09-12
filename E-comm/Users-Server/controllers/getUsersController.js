const {usersData}=require("../models/users");

const getUsers=async(req, res)=>{
    try{
    if(req.user.role=="user"){
        return res.status(403).json({message:"forbidden, admin only!"});
    }
    
    let users=await usersData.find();
    res.json({message:"done", users});
}catch(err){
    res.status(500).json({message:"internal server error", error:err.message});
}
}

module.exports={getUsers}