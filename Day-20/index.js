const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});


io.on("connection", (socket) => {
  socket.on("join room", () => {
    socket.join("my first room");
    console.log(
      "socket with id " + socket.id + " joined the room my first room"
    );
    io.to("my first room").emit("hello", "Welcome in my first Socket.io Room!\n i'm the admin here");

    io.except("my first room").emit("hello", "Hello, world!");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("leave room", () => {
    socket.leave("my first room");
    console.log("socket with id " + socket.id + " left the room my first room");
  });

  io.on("disconnection", () => {
    console.log("socket disconnected...");
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.........`);
});
