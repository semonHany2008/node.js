const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      modules: [
        { type: mongoose.Schema.Types.ObjectId, ref: "courses_modules" },
      ],
      grade: { type: String, required: true },
      progression_percentage: { type: String, required: true },
      hasCertificate: { type: Boolean, required: true },
      user_status: {
        type: String,
        enum: ["graduated", "enrolled"],
        default: "enrolled"
      },
    });

const coursesModel = mongoose.model("courses", coursesSchema);
module.exports = coursesModel;
