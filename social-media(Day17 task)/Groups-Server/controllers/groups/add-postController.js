const groupsModel = require("../../models/groups");
const postsModel = require("../../models/posts");

const add_post = async (req, res) => {
  try {
    let { groupId, title, content } = req.body;
    let foundGroup = await groupsModel.findOne({ _id: groupId });
    if (!foundGroup) {
      return res.status(400).json({ message: "group not found!" });
    }
    let isMember=foundGroup.members.some((memberId)=>memberId.toString()===req.user.id);
    if(!isMember && foundGroup.creator!=req.user.username){
        return res.status(403).json({ message: "you are not a member of this group!" });
    }
    let newPost = new postsModel({ title, content, groupId, username: req.user.username });
    await newPost.save();
    await groupsModel.updateOne({ _id: groupId }, { $push: { posts: newPost._id } });

    res.json({ message: "post added!", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = add_post;
