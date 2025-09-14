const fetchGetDelete=require("../../utils/fetch_get_delete");

const get_reels=async(req, res)=>{
    try {
    let data=fetchGetDelete("http://localhost:6000/reels/", "GET", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=get_reels