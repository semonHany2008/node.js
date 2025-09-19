const {loadStudents, saveStudents}=require('../FS_operations')
const postEditStudent=(req,res)=>{
    const students=loadStudents();
    const {id}=req.params;
    const newData=req.body;
    const targetStudent=studends.find((std)=>std.id==id);
    students.splice(students.indexOf(targetStudent),1,newData);
    saveStudents(students);
    res.render('view-students', students);
}

module.exports={postEditStudent}