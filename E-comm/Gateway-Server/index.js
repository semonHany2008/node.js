const express = require("express");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const app = express();
app.use(express.json());

let allowedURLs = ["http://127.0.0.1:3000", "http://127.0.0.1:8080"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedURLs.includes(origin)) {
        callback(null, origin);
      } else {
        callback("not allowed by cors");
      }
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
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Gateway Server is running on port ${process.env.PORT}...........`
  );
});
