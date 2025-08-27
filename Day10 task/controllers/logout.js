const {loadUsers, saveUsers, loadLoggedInUser}=require('../FS_operations');
const users=loadUsers();
const loggedInUSer = loadLoggedInUser();

const logout=(req,res)=>{
    users=users.filter((user)=>user.username!=loggedInUSer.username);
    saveUsers();
}

module.exports={logout}