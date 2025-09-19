const getRegister=(req, res)=>{
    try {
    res.render("register.ejs", { message: null });
  } catch (error) {
    res.render("register.ejs", { message: error });
  }
}

module.exports={getRegister}