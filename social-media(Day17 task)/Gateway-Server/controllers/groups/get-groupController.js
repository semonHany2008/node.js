const fetchGetDelete=require("../../utils/fetch_get_delete");

const get_group = async (req, res) => {
  try {
    let groupId = req.params.id;
    if(!groupId){
        return res.status(400).json({ message: "group id is required!" });
    }
    let data=await fetchGetDelete(`http://127.0.0.1:4000/groups/${req.params.id}`, "GET", req.session.token);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = get_group;
