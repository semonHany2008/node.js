const { sessionModel } = require("../../models/session");
const { categoriesModel } = require("../../models/Categories");
const { notesModel } = require("../../models/Notes");

const deleteCategory = async (req, res) => {
  try {
    let token = req.headers.token;
    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }

    let { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "category id is required!" });
    }

    let foundCategory = await categoriesModel.findById({ _id });
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }

    let usingNotes = await notesModel.findOne({
      categoryName: foundCategory.name,
    });
    if (usingNotes) {
      return res.status(400).json({ message: "Category"+foundCategory.name+" in use by notes!" });
    }

    await categoriesModel.deleteOne({ _id });
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log("error deleting category "+foundCategory.name+": ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { deleteCategory };
