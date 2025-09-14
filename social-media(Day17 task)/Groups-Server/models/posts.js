const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  groupId: { type: String },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  share: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now , expires: '7d' }
});

const postsModel = mongoose.model("posts", postsSchema);
module.exports = postsModel;
