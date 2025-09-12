const path=require('path');
require('dotenv').config(path.join(__dirname,"../.env"));
const jwt=require('jsonwebtoken');


const check_req=async(req, res, next)=>{
    const {username, password}=req.headers;
    if(!username || !password){
        return res.status(401).json({message:"unauthorized, missed auth headers properties!"});
    }
    if(username !==process.env.USERNAME_SERVER || password!==process.env.PASSWORD_SERVER){
        return res.status(401).json({message:"unauthorized, invalid auth headers properties!"});
    }
    if(!req.session.token){
        return res.status(401).json({message:"unauthorized, login first!"});
    }

    await jwt.verify(req.session.token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(401).json({message:"invalid token!"});
        }
        req.user=decoded;
        next();
    })
}

module.exports=check_req