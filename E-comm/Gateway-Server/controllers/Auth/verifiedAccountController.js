const { fetchPostRequest } = require('../../utils/fetch_server');



const verifiedAccount = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "All inputs are required" });
    }
    const data = await fetchPostRequest('http://127.0.0.1:8080/auth/verified-account', { email, otp });
    req.session.token = data.token
    return res.json({ message: data });
}


module.exports = { verifiedAccount }