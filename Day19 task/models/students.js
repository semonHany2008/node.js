const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  user:{type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
  enrolled_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
});

const studentsModel = mongoose.model("students", studentsSchema);
module.exports = studentsModel;
