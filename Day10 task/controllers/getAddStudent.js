const getaddStudent=(req,res)=>{
    try {
    res.render("add-student.ejs", { message: null, page:'add-student' });
  } catch (error) {
    res.render("add-student.ejs", { message: error,  page:'add-student' });
  }
}

module.exports={getaddStudent}