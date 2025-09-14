const check_req=async (req, res, next)=>{
    const {username, password}=req.headers;
    if(!username || !password || username!==process.env.SERVER_USERNAME || password!==process.env.SERVER_PASSWORD){
        return res.status(401).json({message:"unauthorized!"});
    }
    next();
}

module.exports=check_req