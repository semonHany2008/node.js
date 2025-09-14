const fetchGetDelete=require("../../utils/fetch_get_delete");

const get_post=async(req, res)=>{
    try {
    let data=fetchGetDelete("http://127.0.0.1:8080/posts/:id", "GET", req.session.token);
    res.json({message:data.message, post:data.post});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=get_post