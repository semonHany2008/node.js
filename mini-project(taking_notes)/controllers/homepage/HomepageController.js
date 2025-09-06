const { sessionModel } = require("../../models/session.js");
const { categoriesModel } = require("../../models/Categories.js");
const { notesModel } = require("../../models/Notes.js");

const Homepage = async (req, res) => {
  try {
    const currentSession = await sessionModel.findOne({
      token: req.headers.token || req.query.token
    });
    if (!currentSession) {
      return res
        .status(401)
        .json({ message: "sorry, you're not authenticated! try login first" });
    }

    let currentUser= {
        username: currentSession.username,
        role: currentSession.role,
      };
    let categories, notes;
    if(currentSession.role=='user'){
      categories = await categoriesModel.find({
        ownerUsername: currentSession.username,
      });
      notes = await notesModel.find({
        ownerUsername: currentSession.username,
      });
    }
    else if(currentSession.role=='admin'){
      categories = await categoriesModel.find();
      notes = await notesModel.find();
    }

    // res.json({ currentUser, categories, notes });
    res.render("homepage.ejs",{ currentUser, categories, notes });
  } catch (error) {
    console.log("error getting homepage: ",error);
    res.status(500).json({message:"internal server error", error:error.message});
  }
};

module.exports = { Homepage };
