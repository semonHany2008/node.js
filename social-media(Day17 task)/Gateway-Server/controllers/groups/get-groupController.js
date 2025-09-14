const fetchGetDelete=require("../../utils/fetch_get_delete");

const get_group = async (req, res) => {
  try {
    let data=await fetchGetDelete("http://127.0.0.1:4000/groups/:id", "GET", req.session.token);
    res.json({message:data.message, group:data.group});
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = get_group;
