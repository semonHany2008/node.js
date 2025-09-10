const express = require('express');
const router = express.Router();



router.post('/login' , (req,res) => {
    const {username , password} = req.body
    if (!username || !password) {
        return res.status(400).json({error : 'Username and password are required'})
    }
    res.json({message : 'Login successful'})
})

router.post('/register' , (req,res) => {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: "All inputs are required" });
        }
    res.json({message : 'successful registeration'})
})


module.exports = router