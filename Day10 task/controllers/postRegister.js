const {loadUsers, saveUsers}=require('../FS_operations');
const users=loadUsers();
const postRegister=(req, res)=>{
    let newUser=req.body;
    if(! newUser.fullName ||! newUser. username||! newUser.email||! newUser. password||! newUser. role)
    {
        return res.render('register',{message:"all fields are required!"});
    }
    const foundUser=users.find((user)=>user.username==newUser.username);
    if(foundUser){
        return res.render('register',{message:"you already registered, try login!"});
    }
    const usersIds=users.map((user)=>user.id);
    newUser.id=Math.max(...userIds);
    users.push(newUser);
    saveUsers(users);
    res.render('index',{})
}

module.exports={postRegister}