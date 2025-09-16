const {fetchGetRequest}=require("../../utils/fetch_server");

const getUsers= async (req, res)=>{
    try{
        let token=req.session.token;
  console.log("token before sending: ", token, "length: ",token?.length );
    let data=await fetchGetRequest("http://localhost:3000/users/",token);
    if(data.users)
        return res.json({message:data.message, users:data.users});
    res.status(400).json({message:data});
    }catch(err){
    res.status(500).json({message:"internal server error", error:err.message});
}
}

module.exports={getUsers}