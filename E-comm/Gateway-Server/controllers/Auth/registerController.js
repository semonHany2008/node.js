const { fetchServer } = require('../../utils/fetch_server');


const register = async (req, res) => {
    const { firstName, lastName, username, email, address, password, role } = req.body;
    if (!firstName || !lastName || !username || !email || !address || !password || !role) {
        return res.status(400).json({ message: "All inputs are required" })
    }
    const data = await fetchServer('http://127.0.0.1:3000/auth/register',"POST", { firstName, lastName, username, email, address, password, role })
    return res.json({ message: data })
}


module.exports = { register }