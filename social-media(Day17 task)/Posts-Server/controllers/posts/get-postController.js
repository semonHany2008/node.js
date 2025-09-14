const postsModel = require("../../models/posts");

const get_post = async (req, res) => {
  try {
    let { id } = req.params;
    let post = await postsModel.findById(id);
    if (!post) return res.status(404).json({ message: "post not found" });
    res.json({ message: "done", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = get_post;
