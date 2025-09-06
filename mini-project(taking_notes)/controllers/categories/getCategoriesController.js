const { sessionModel } = require("../../models/session");
const { categoriesModel } = require("../../models/Categories");
const jwt=require("jsonwebtoken")


const getCategories = async (req, res) => {
  try {
    let token = req.headers.token || req.query.token;
    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }
    let plainToken=jwt.verify(token, "key");
    let categories;
    if(plainToken.role=='user')
        categories=await categoriesModel.find({ownerUsername: plainToken.username});
    else if(plainToken.role=='admin')
        categories=await categoriesModel.find();
    // res.json(categories);
    res.render('categories.ejs',{categories});
  } catch (error) {
    console.log("error fetching categories: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { getCategories };
