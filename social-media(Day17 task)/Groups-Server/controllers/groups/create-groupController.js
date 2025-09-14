const groupsModel = require("../../models/groups");

const create_group = async (req, res) => {
  try {
    let { name, description } = req.body;
    if (req.user.role == "user") {
      return res.status(403).json({ message: "forbidden, admin only!" });
    }
    let newGroup = new groupsModel({
      name,
      description,
      creator: req.user.username,
    });
    await newGroup.save();
    res.json({ message: "group created!", group: newGroup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

module.exports = create_group;
