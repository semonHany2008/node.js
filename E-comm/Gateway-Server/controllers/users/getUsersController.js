const fetch_server=require("../../utils/fetch_server");

const getUsers= async (req, res)=>{
    let data=fetch_server("http://localhost:3000/users/", "GET");
    if(data.users)
        return res.json({message:data.message, users});
    res.status(400).json({message:data.message, users});
}

module.exports={getUsers}