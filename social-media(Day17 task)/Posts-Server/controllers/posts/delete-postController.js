const postsModel = require("../../models/posts");

const delete_post=async(req, res)=>{
    try {
    let {id}=req.params;
    let post=await postsModel.findById(id);
    if(!post) return res.status(404).json({message:"post not found"});
    if(post.creator !== req.user.username)
        return res.status(403).json({message:"you are not allowed to delete this post"});
    await postsModel.findByIdAndDelete(id);
    res.json({message:"post deleted"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=delete_post