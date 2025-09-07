const login=async (req, res)=>{
    let loginInfo=req.body;

    res.send("successful login!");
}

module.exports={login}