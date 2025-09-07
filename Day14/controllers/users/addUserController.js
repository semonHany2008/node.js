const addUser=async (req, res)=>{
    let user=req.body;
    
    res.send("user added successfully!");
}

module.exports={addUser}