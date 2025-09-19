const express=require('express');
const studentsRouter=express.Router();

const {getStudents, delete_student, getStudentByID, add_student, edit_student}=require("../controllers/studentsControllers");
const checkAuth=require('../middleware/checkAuth');

studentsRouter.get('/allStudents', checkAuth, getStudents);
studentsRouter.get('/:id', checkAuth, getStudentByID);
studentsRouter.post('/add-student', checkAuth, add_student);
studentsRouter.put('/:id', checkAuth, edit_student);
studentsRouter.delete('/:id', checkAuth, delete_student);

module.exports=studentsRouter;