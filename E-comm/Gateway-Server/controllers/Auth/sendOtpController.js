const { fetchPostRequest } = require('../../utils/fetch_server');


const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const data = await fetchPostRequest('http://127.0.0.1:8080/auth/send-otp', { email });
    return res.json({ message: data });
}


module.exports = { sendOtp }