const reelsModel=require("../../models/reels");

const add_reel=async(req, res)=>{
    try {
    let {videoUrl, description}=req.body;
    let newReel=new reelsModel({videoUrl, description, creator:req.user.username});
    await newReel.save();
    res.json({message:"reel added", reel:newReel});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=add_reel