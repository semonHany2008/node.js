const { sessionModel } = require("../../models/session");
const { notesModel } = require("../../models/Notes");
const jwt=require("jsonwebtoken")

const getNote=async (req, res)=>{
    try{
        let token = req.headers.token;
        let foundSession = await sessionModel.findOne({ token });
        if (!foundSession) {
            return res.status(401).json({ message: "you are not logged in!" });
        }
        
        let {_id}=req.params;
        if(!_id){
            return res.status(400).json({ message: "note id is required!" });
        }

        try{
            let plainToken=jwt.verify(token, "key"); 
            let foundNote;
            if(plainToken.role=='user')
                foundNote=await notesModel.findOne({_id, ownerUsername:plainToken.username});
            else if(plainToken.role=='admin')
                foundNote=await notesModel.findOne({_id});
            if (!foundNote) {
                return res.status(404).json({ message: "Note not found!" });
            }
            res.status(200).json(foundNote);
        }catch (err) {
            return res.status(401).json({ message: "invalid or expired token " });
        }
    }catch(error){
        console.log("error fetching note: ", error);
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

module.exports={getNote}