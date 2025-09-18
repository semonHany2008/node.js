const usersModel = require("../models/users")
const bcrypt = require("bcrypt");
const getusers = async (req, res) => {
    try {

        const getUsers = await usersModel.find();
        if(getUsers.length === 0){
            return res.json("users not found");
        }

        return res.status(200).json(getUsers);
        
    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
    
}




const change_password = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        if (!username || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const getUser = await usersModel.findOne({ username });
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, getUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        if(newPassword === oldPassword) {
            return res.status(400).json({ message: "New password must be different from the old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        getUser.password = hashedPassword;
        await getUser.save();

        req.body.newPassword=hashedPassword
        req.body.oldPassword=bcrypt.hashSync(oldPassword, 10)
        fetch("http://127.0.0.1:3000/change-password", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(req.body)})
		.then(res=>res.json())
		.then(data=>console.log(data.message))
		.catch(err=>console.log(err.message));

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const delete_user = async (req, res) => {
  try {
     const { username , password } = req.body;
     if(!username || !password){
        return res.status(400).json({ message: "Username and password are required" });
     }

     const getUser = await usersModel.findOne({ username });
     if (!getUser) {
        return res.status(404).json({ message: "User not found" })
     }
     const isMatch = await bcrypt.compare(password, getUser.password);
     if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
     }
     await usersModel.findOneAndDelete({ username });

     req.body.password=bcrypt.hashSync(password, 10);
     fetch("http://127.0.0.1:3000/delete-user", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify(req.body)})
		.then(res=>res.json())
		.then(data=>console.log(data.message))
		.catch(err=>console.log(err.message));

    return res.status(200).json({message:"delete successfull"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = { getusers, change_password ,delete_user};
