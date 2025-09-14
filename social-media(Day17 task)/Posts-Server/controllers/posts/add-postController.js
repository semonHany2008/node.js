const postsModel=require("../../models/posts");

const add_post=async(req, res)=>{
    try {
    let {title, content}=req.body;
    let newPost=new postsModel({title, content, creator:req.user.username});
    await newPost.save();
    res.json({message:"post added", post:newPost});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=add_post