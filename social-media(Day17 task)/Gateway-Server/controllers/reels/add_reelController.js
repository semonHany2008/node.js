const fetch_post_update=require("../../utils/fetch_post_update");

const add_reel=async(req, res)=>{
    try {
    let {videoUrl, description}=req.body;
    if(!videoUrl || !description)
        return res.status(400).json({message:"videoUrl and description are required"});

    let data=await fetch_post_update("http://localhost:3001/reels/add-reel","POST", req.session.token,  {videoUrl, description});
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=add_reel