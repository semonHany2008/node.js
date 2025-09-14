const groupsModel = require("../../models/groups");

const get_group=async(req, res)=>{
    try {
    let  groupId  = req.params.id;
    console.log("group id: ", groupId);
    let foundGroup = await groupsModel.findById(groupId ).populate("posts").populate('reels');
    if (!foundGroup) {
      return res.status(400).json({ message: "group not found!" });
    }
    let isMember=foundGroup.members.some((memberId)=>memberId.toString()===req.user.id);
    if(!isMember && foundGroup.creator!=req.user.username){
        return res.status(403).json({ message: "you are not a member of this group!" });
    }
    if(req.user.role=='admin' || foundGroup.creator==req.user.username){
        await foundGroup.populate("members", "username role");
    }
    res.json({ message: "done", group: foundGroup });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports=get_group