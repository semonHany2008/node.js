const { sessionModel } = require("../../models/session");
const { notesModel } = require("../../models/Notes");
const jwt=require("jsonwebtoken")

const getNotes=async (req, res)=>{
    try{
        let token = req.headers.token || req.query.token;
        let foundSession = await sessionModel.findOne({ token });
        if (!foundSession) {
        return res.status(401).json({ message: "you are not logged in!" });
        }
        try{
            let plainToken=jwt.verify(token, "key");
            let notes;
            if(plainToken.role=='user')
                notes=await notesModel.find({ownerUsername: plainToken.username});
            else if(plainToken.role=='admin')
                notes=await notesModel.find();
            // res.json(notes);
            res.render('notes', {notes});
        }catch (err) {
            return res.status(401).json({ message: "invalid or expired token " });
        }
    }catch(error){
        console.log("error fetching notes: ", error);
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

module.exports={getNotes}