const {loadUsers, saveUsers, loadLoggedInUser}=require('../FS_operations')

const deleteUser=(req, res)=>{
    const user=loadLoggedInUser();
    const {id}=req.params;
    let users=loadUsers();
    const foundUser=users.find((user)=>user.id==id);
    if(!foundUser)
        return res.render('error',{message:"user not found to delete!", user})    
    users=users.filter((user)=>user.id!=id);
    saveUsers(users);
    // users=users.map((user)=>({id:user.id, username:user.username, fullName:user.fullName, email:user.email}));
    res.render('manage-users',{users, user});
}

module.exports={deleteUser}