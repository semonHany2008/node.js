const fetchGetDelete=require("../../utils/fetch_get_delete");

const delete_post=async(req, res)=>{
    try {
    let data=fetchGetDelete("http://127.0.0.1:8080/posts/:id", "DELETE", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=delete_post