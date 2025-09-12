const {fetchGetRequest}=require("../../utils/fetch_server");

const getUsers= async (req, res)=>{
    try{
    let data=await fetchGetRequest("http://localhost:3000/users/");
    if(data.users)
        return res.json({message:data.message, users});
    res.status(400).json({message:data});
    }catch(err){
    res.status(500).json({message:"internal server error", error:err.message});
}
}

module.exports={getUsers}