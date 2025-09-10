const express = require('express');
const router = express.Router();



router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' })
        }
        fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((data) => data.json())
            .then((finalData) => res.status(200).json(finalData))
            .catch((error) => console.log(error))
    }
    catch (error) {
        console.log(error)
    }
})


router.post('/register', (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: "All inputs are required" });
        }
        fetch('http://127.0.0.1:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, username, email, password })
        })
            .then((data) => data.json())
            .then((finalData) => res.status(200).json(finalData))
            .catch((error) => console.log(error))
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router;