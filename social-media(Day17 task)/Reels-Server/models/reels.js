const mongoose = require("mongoose");

const reelsSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  groupId: { type: String },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  share: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

const reelsModel = mongoose.model("reels", reelsSchema);
module.exports = reelsModel;
