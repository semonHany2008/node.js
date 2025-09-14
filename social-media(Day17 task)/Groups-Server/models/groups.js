const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  creator: { type: String, required: true },
  members: { type: [{type:mongoose.Schema.Types.ObjectId, ref:'users'}], default: [] },
  posts: { type: [{type:mongoose.Schema.Types.ObjectId, ref:"posts"}], default: [] },
  reels: { type: [{type:mongoose.Schema.Types.ObjectId, ref:"reels"}], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const groupsModel = mongoose.model("groups", groupsSchema);
module.exports = groupsModel;
