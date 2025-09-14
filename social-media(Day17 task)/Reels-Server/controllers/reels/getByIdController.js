const getById=async(req, res)=>{
    try {
    let {id}=req.params;
    let reel=await reelsModel.findById(id);
    if(!reel) return res.status(404).json({message:"reel not found"});
    res.json({message:"done", reel});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=getById