const fetchGetDelete=require("../../utils/fetch_get_delete");

const getById=async(req, res)=>{
    try {
    let data=await fetchGetDelete(`http://localhost:3001/reels/${req.params.id}`, "GET", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=getById