const fetchPostUpdate = require("../../utils/fetch_post_update");

const send_otp=async(req, res)=>{
    try {
    let email = req.body.email;
    if (!email) {
      return res
        .status(400)
        .json({ message: "you must provide your email!" });
    }
    let data = await fetchPostUpdate(
      "http://127.0.0.1:3000/auth/send-otp",
      "POST",
      undefined,
      req.body
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=send_otp