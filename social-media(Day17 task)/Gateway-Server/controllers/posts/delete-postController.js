const fetchGetDelete=require("../../utils/fetch_get_delete");

const delete_post=async(req, res)=>{
    try {
    let data=await fetchGetDelete(`http://127.0.0.1:8080/posts/${req.params.id}`, "DELETE", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=delete_post