const {tokenModel}=require('../models/token');
const logout=(req,res)=>{
    const {username}=req.body;
    const loggedoutUser=tokenModel.findOneAndDelete({username});
    if(!loggedoutUser)
        return res.json({message:"you are not loggedin!"});
    return res.json({message:"logout done!",loggedoutUser});
}

module.exports={logout}