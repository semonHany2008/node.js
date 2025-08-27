const {loadStudents, loadLoggedInUser}=require('../FS_operations')
const getEditStudent=(req,res)=>{
    const user=loadLoggedInUser();
    const students=loadStudents();
    const {id}=req.params;
    let foundStudent=students.find((std)=>std.id==id);
    if(!foundStudent)
        res.render("error", { message:"user not found", user});
    res.json({ message: null, student:foundStudent});
}

module.exports={getEditStudent}