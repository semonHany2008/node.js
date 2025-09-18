const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const productsRouter = require("./router/productsRouter");
const shoppingCartRouter = require("./router/shoppingCartRouter");
const buyRouter = require("./router/buyRouter");

const checkAuth = require("./middleware/checkAuth");

app.use(express.json());

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || origin == "http://127.0.0.1:5500") callback(null, true);
			else callback("this origin not allowed by cors!");
		},
		credentials: true,
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			secure: false,
		},
	})
);

app.use("/auth", authRouter);
app.use(checkAuth);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/shoppingCart", shoppingCartRouter);
app.use("/buy", buyRouter);

connectDB();

mongoose.connection.once("connected", () => {
	app.listen(process.env.PORT || 3000, () => {
		console.log("express server running on port " + process.env.PORT || 3000);
	});
});

mongoose.connection.on("error", () => {
	console.log("error connecting mongodb");
});
