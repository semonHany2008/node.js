const reelsModel=require("../../models/reels");

const get_reels=async(req, res)=>{
    try {
    let reels=await reelsModel.find({creator:req.user.username});
    res.json({message:"done", reels});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=get_reels