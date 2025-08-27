const {loadStudents, saveStudents}=require('../FS_operations');

const postaddStudent=(req,res)=>{
    const students=loadStudents();
    console.log("req.body:", req.body);
    const newStudent=req.body;
    if(!newStudent.firstName|| !newStudent. lastName|| !newStudent. email|| !newStudent. age|| !newStudent. course|| !newStudent.status){
        return res.render('add-student',{message:"all fields are required!", page:'add-student'  });
    }
    const foundStudent=students.find((student)=>student.email==newStudent.email);
    if(foundStudent){
        return res.render('add-student',{message:"this student already exist!",  page:'add-student' });
    }
    students.push(newStudent);
    saveStudents(students);
    res.render('add-student',{message:"student added successfully!",  page:'add-student' });
}

module.exports={postaddStudent}