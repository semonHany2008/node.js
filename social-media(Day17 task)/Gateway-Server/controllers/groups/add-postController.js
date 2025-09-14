const fetch_post_update=require("../../utils/fetch_post_update");

const add_post = async (req, res) => {
  try {
    let { groupId, title, content } = req.body;
    if (!groupId || !title || !content) {
        return res
        .status(400)
        .json({ message: "groupId and content are required!" });
    }

    let data=await fetch_post_update("http://127.0.0.1:4000/groups/add-post", "PATCH", req.session.token, req.body);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = add_post;
