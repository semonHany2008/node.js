const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  ownerUsername: { type: String, required: true },
  categoryName: { type: String, required: true, default: "general" },
  createdAt: { type: Date, default: Date.now, expires: "3d" },
});

const notesModel = mongoose.model("notes", notesSchema);
module.exports = { notesModel };
