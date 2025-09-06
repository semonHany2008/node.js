const { sessionModel } = require("../../models/session");
const { categoriesModel } = require("../../models/Categories");
const jwt = require("jsonwebtoken");

const createCategory = async (req, res) => {
  try {
    let token = req.headers.token;
    let foundSession = await sessionModel.findOne({ token });
    if (!foundSession) {
      return res.status(401).json({ message: "you are not logged in!" });
    }

    let  categoryName  = req.body.name;
    if (!categoryName) {
      return res.status(400).json({ message: "category name is required!" });
    }

    try {
      let plainToken = jwt.verify(token, "key");
      let newCategory = new categoriesModel({
        name: categoryName,
        ownerUsername: plainToken.username,
      });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      return res.status(401).json({ message: "invalid or expired token " });
    }
    /**another solution for jwt.verify() **/
    // jwt.verify(token, "key", async(error, plainToken)=>{
    //     if(error){
    //         return res.json({message:"invalid or expired token"});
    //     }
    //     let newCategory=new categoriesModel({name:categoryName, ownerUsername:plainToken.username});
    //     await newCategory.save();
    //     res.status(201).json(newCategory);
    // })
  } catch (error) {
    console.log("error creating category: ", error);
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

module.exports = { createCategory };
