const {loadUsers, loadLoggedInUser}=require('../FS_operations')

const getUsers=(req,res)=>{
    const user=loadLoggedInUser();
    let users=loadUsers();
    // users=users.map((user)=>({id:user.id, username:user.username, fullName:user.fullName, email:user.email}))
    res.render('manage-users',{users,user})
}

module.exports={getUsers}