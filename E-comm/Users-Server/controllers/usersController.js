const {usersData}=require("../../models/users");

const getUsers=async(req, res)=>{
    if(req.user.role=="user"){
        return res.status(403).json({message:"forbidden admin only!"});
    }
    
    let users=await usersData.find();
    res.json({message:"done", users});
}

module.exports={getUsers}