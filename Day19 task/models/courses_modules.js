const mongoose = require("mongoose");

const courses_modulesSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  duration: { type: number, required: true },
  lessons: [
    {
      duration: { type: number, required: true },
      source_pdf: { type: String },
      comments: Array,
    },
  ],
});

const courses_modulesModel = mongoose.model("courses_modules", courses_modulesSchema);
module.exports = courses_modulesModel;
