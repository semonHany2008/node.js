const { sessionModel } = require("../../models/session");
const { notesModel } = require("../../models/Notes");
const { categoriesModel } = require("../../models/Categories");
const jwt=require("jsonwebtoken")

const deleteNote=async (req, res)=>{
    try{
        let token = req.headers.token;
        let foundSession = await sessionModel.findOne({ token });
        if (!foundSession) {
            return res.status(401).json({ message: "you are not logged in!" });
        }

        let {_id}=req.params;

        let plainToken;
        try{
            plainToken=jwt.verify(token, 'key');
        }catch(err){
            return res.status(401).json({message:"invalid or expired token!"});
        }
        
        let deletedNote
        if(plainToken.role=='admin')
            deletedNote=await notesModel.findOneAndDelete({_id});
        else if(plainToken.role=='user')
            deletedNote=await notesModel.findOneAndDelete({_id, ownerUsername:plainToken.username});
        if(!deletedNote)
            return res.status(404).json({message:"note not found!"});

        res.json({
        message:"note deleted!",deletedNote
        });
    }catch(error){
        console.log("error deleting note: ", error);
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

module.exports={deleteNote}