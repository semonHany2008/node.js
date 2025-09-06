const { sessionModel } = require("../../models/session");
const { notesModel } = require("../../models/Notes");
const { categoriesModel } = require("../../models/Categories");
const jwt=require("jsonwebtoken")

const createNote=async (req, res)=>{
    try{
        let token = req.headers.token;
        let foundSession = await sessionModel.findOne({ token });
        if (!foundSession) {
            return res.status(401).json({ message: "you are not logged in!" });
        }

        let {title, content, categoryName}=req.body;
        if(!title || !content){
            return res.status(400).json({ message: "title and content of the note are required!" });
        }

        let plainToken;
        try{
            plainToken=jwt.verify(token, 'key');
        }catch(err){
            return res.status(401).json({message:"invalid or expired token!"});
        }
                
        if(categoryName){
            let existingCategory=await categoriesModel.findOne({ownerUsername:plainToken.username, name:categoryName});
            if(!existingCategory){
                return res.status(400).json({message:"Unknown category for this user!"});
            }
        }
        else{
            categoryName='general';
        }

        let addedNote=new notesModel({title, content, categoryName, ownerUsername:plainToken.username});
        await addedNote.save();
        res.status(201).json(addedNote);
    }catch(error){
        console.log("error creating note: ", error);
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

module.exports={createNote}