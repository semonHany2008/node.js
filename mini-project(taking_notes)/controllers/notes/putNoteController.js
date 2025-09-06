const { sessionModel } = require("../../models/session");
const { notesModel } = require("../../models/Notes");
const { categoriesModel } = require("../../models/Categories");
const jwt=require("jsonwebtoken")

const updateNoteCompletely=async (req, res)=>{
    try{
        let token = req.headers.token;
        let foundSession = await sessionModel.findOne({ token });
        if (!foundSession) {
            return res.status(401).json({ message: "you are not logged in!" });
        }

        let {_id}=req.params;
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
            let existingCategory;
            if(plainToken.role=='user')
                existingCategory=await categoriesModel.findOne({ownerUsername:plainToken.username, name:categoryName});
            else if(plainToken.role=='admin')
                existingCategory=await categoriesModel.findOne({name:categoryName});
            if(!existingCategory){
                return res.status(400).json({message:plainToken.role=='user'?"Unknown category for this user!":"this category isn't exist!"});
            }
        }
        else{
            categoryName='general';
        }

        let updatedNote;
        if(plainToken.role=='admin')
            updatedNote=await notesModel.findOneAndUpdate({_id}, {$set:{title, content, categoryName}}, {new:true});
        else if(plainToken.role=='user')
            updatedNote=await notesModel.findOneAndUpdate({_id, ownerUsername:plainToken.username}, {$set:{title, content, categoryName}}, {new:true});

        if(!updatedNote){
            return res.status(404).json({message:"note not found!"});
        }
        res.json(updatedNote);
    }catch(error){
        console.log("error updating note: ", error);
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

module.exports={updateNoteCompletely}