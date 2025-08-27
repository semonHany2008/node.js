const getLogin = (req, res) => {
  try {
    res.render("login.ejs", { message: null });
  } catch (error) {
    res.render("login.ejs", { message: error });
  }
};

module.exports = { getLogin };
