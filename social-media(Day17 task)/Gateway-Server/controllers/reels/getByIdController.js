const getById=async(req, res)=>{
    try {
    let data=fetchGetDelete("http://localhost:6000/reels/:id", "GET", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=getById