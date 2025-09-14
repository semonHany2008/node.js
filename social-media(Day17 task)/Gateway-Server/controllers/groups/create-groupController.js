const fetch_post_update=require("../../utils/fetch_post_update");

const create_group = async (req, res) => {
  try {
    let { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "name and description are required!" });
    }
    let data=await fetch_post_update("http://127.0.0.1:4000/groups/create-group", "POST", req.session.token, req.body);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = create_group;
