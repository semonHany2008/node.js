const {loadStudents, saveStudents, loadLoggedInUser}=require('../FS_operations')

const deleteStudent=(req, res)=>{
    const user=loadLoggedInUser();
    const {id}=req.params;
    let students=loadStudents();
    const foundStudent=students.find((student)=>student.id==id);
    if(!foundStudent)
        res.render('error',{message:"student not found to delete!",user})
    
    students=students.filter((student)=>student.id!=id);
    saveStudents(students);
    // students=students.map((student)=>({id:student.id, studentname:student.studentname, fullName:student.fullName, email:student.email}));
    res.render('view-students',{students, search:'', canEdit:true, canDelete:true});
}

module.exports={deleteStudent}