const jwt=require("jsonwebtoken");

const check_auth=async (req, res, next)=>{
    const {username, password, token}=req.headers;
    if(!username || !password || username!==process.env.SERVER_USERNAME || password!==process.env.SERVER_PASSWORD){
        return res.status(401).json({message:"unauthorized!"});
    }
    if(!token){
        return res.status(401).json({message:"unauthorized, login first!"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(401).json({message:error.message});
        }
        req.user=decoded;
        next();
    });
}

module.exports=check_auth