const { sessionModel } = require("../../models/session");
const { categoriesModel } = require("../../models/Categories");
const { notesModel } = require("../../models/Notes");
const jwt=require("jsonwebtoken")


const getCategoryNotes = async (req, res) => {
  try {
    let token = req.headers.token || req.query.token;
    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }
    let plainToken=jwt.verify(token, "key");
    let category=await categoriesModel.findOne({_id:req.params._id});
    let categoryNotes=await notesModel.find({categoryName:category.name, ownerUsername:category.ownerUsername});
    res.render('notes.ejs',{notes:categoryNotes, page:"categoryNotes", role:plainToken.role});
  } catch (error) {
    console.log("error fetching category notes: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { getCategoryNotes };
