const {loadStudents}=require('../FS_operations');
const getStudents=(req,res)=>{
    let students=loadStudents();
    // students=students.map((std)=>({firstName:std.firstName, lastName:std.lastName, email:std.email}));
    res.render('view-students',{students, search:req.query.search || '', canEdit:true, canDelete:true})
}

module.exports={getStudents}