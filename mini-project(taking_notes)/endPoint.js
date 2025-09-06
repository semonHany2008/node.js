const { app } = require("./server");
const { Homepage } = require("./controllers/homepage/HomepageController");
const { register } = require("./controllers/authentication/registerController");
const {
  login_start,
  login_verify,
} = require("./controllers/authentication/loginController");
const {
  forgotPassword,
  resetPassword,
} = require("./controllers/authentication/passwordController");
const { logout } = require("./controllers/authentication/logoutController");
const {
  getCategories,
} = require("./controllers/categories/getCategoriesController");
const {
  getCategoryNotes,
} = require("./controllers/categories/getCategoryNotesController");
const {
  createCategory,
} = require("./controllers/categories/createCategoryController");
const {
  deleteCategory,
} = require("./controllers/categories/deleteCategoryController");
const {getNotes}=require("./controllers/notes/getNotesController");
const {getNote}=require("./controllers/notes/getNoteController");
const {createNote}=require("./controllers/notes/createNoteController");
const {updateNoteCompletely}=require("./controllers/notes/putNoteController");
const {updateNotePartially}=require("./controllers/notes/patchNoteController");
const {deleteNote}=require("./controllers/notes/deleteNoteController");
const {getProfile}=require("./controllers/profile/getProfileController");
const {changePassword}=require("./controllers/profile/changePasswordController");
const {change_first_last_name}=require("./controllers/profile/change_first_last_nameController");
const {enable_otp}=require("./controllers/profile/enable_otpController");
const {render_login_start}=require("./controllers/pages/login_start");
const {render_login_verify}=require("./controllers/pages/login_verify");
const {render_register}=require("./controllers/pages/register");
const {render_forgot_password}=require("./controllers/pages/forgot_password");
const {render_reset_password}=require("./controllers/pages/reset_password");




//Homepage
app.get("/", Homepage);


//authentication
app.post("/auth/register", register);

app.post("/auth/login/start", login_start);

app.post("/auth/login/verify", login_verify);

app.post("/auth/forgot-password", forgotPassword);

app.post("/auth/reset-password", resetPassword);

app.delete("/auth/logout", logout);


//categories
app.get("/categories", getCategories); //page

app.post("/categories", createCategory);

app.delete("/categories/:_id", deleteCategory);

app.get("/categories/:_id", getCategoryNotes);



//notes
app.get("/notes", getNotes);

app.get("/notes/:_id", getNote);

app.post("/notes", createNote);

app.put("/notes/:_id", updateNoteCompletely);

app.patch("/notes/:_id", updateNotePartially);

app.delete("/notes/:_id", deleteNote);


//profile
app.get("/profile", getProfile); //page

app.post("/profile/change-password", changePassword);

app.post("/profile/change-first-last-name", change_first_last_name);

app.post("/profile/enable-otp", enable_otp);


//pages
app.get("/render_login_start",render_login_start);

app.get("/render_login_verify",render_login_verify);

app.get("/render_register",render_register);

app.get("/render_forgot_password", render_forgot_password);

app.get("/render_reset_password", render_reset_password);
