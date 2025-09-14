const fetch_post_update=require("../../utils/fetch_post_update");

const add_post=async(req, res)=>{
    try {
    let {title, content}=req.body;
    if(!title || !content)
        return res.status(400).json({message:"title and description are required"});

    let data=fetch_post_update("http://localhost:8080/posts/new-post","POST", req.session.token,  {title, content});
    res.json({message:data.message, post:data.post});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=add_post