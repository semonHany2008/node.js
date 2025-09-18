const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.join(__dirname, "../.env") });


const login = async (req, res) => {
	try {
		let { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "username and password are required!" });
		}
		let foundUser = await usersModel.findOne({ username });
		if (!foundUser) {
			return res.status(400).json({ message: "user not found!" });
		}
		const checkPassword = bcrypt.compareSync(password, foundUser.password);
		if (!checkPassword) {
			return res.status(400).json({ message: "invalid password!" });
		}

		let token = jwt.sign(
			{ username: foundUser.username, id: foundUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: 300 }
		);
		req.session.token = token;
		return res.json({ message: "successful login!" });
	} catch (err) {
		res.status(500).json({ message: "internal server error!", error: err });
	}
};

const register = async (req, res) => {
	try {
		let { username, password, email, firstName, lastName, phoneNumber } = req.body;
		if (!username || !password || !email || !firstName || !lastName || !phoneNumber) {
			return res.status(400).json({ message: "all fields are required!" });
		}
		// Check Email
		const validEmails = [
			"gmail.com",
			"yahoo.com",
			"hotmail.com",
			"outlook.com",
		];
		if (!validEmails.includes(email.split("@")[1])) {
			return res.status(400).json({ message: "invalid email!" });
		}
		let foundUser = await usersModel.findOne({
			$or: [{ email }, { username }],
		});
		if (foundUser) {
			return res.status(400).json({ message: "emailOrUsername already used!" });
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: "password must be at least 8 characters!" });
		}
		const hashedPassword = bcrypt.hashSync(password, 10);
		let newUser = new usersModel({
			username,
			password: hashedPassword,
			email,
			firstName,
			lastName,
			phoneNumber,
		});
		await newUser.save();

		fetch("http://127.0.0.1:3000/add-user", {method:"POST", headers:{"Content-Type":"application/json", username, password:hashedPassword}})
		.then(res=>res.json())
		.then(data=>console.log(data.message))
		.catch(err=>console.log(err.message));

		let token = jwt.sign(
			{ username: newUser.username, id: newUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: 300 }
		);
		req.session.token = token;
		return res.json({ message: "successful registeration!" });
	} catch (err) {
		res.status(500).json({ message: "internal server error!", error: err });
	}
};

module.exports = { login, register };
