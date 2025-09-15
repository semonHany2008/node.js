const express = require("express");
const http = require("node:http");
const path = require("path");
const cors = require('cors');
require("dotenv").config();
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

io.on("connection", (socket) => {
    let roName;
  socket.on("join room", (roomName) => {
    roName=roomName;
    socket.join(roomName);
    console.log("socket with id "+socket.id+" joined the room " + roomName);
  });

  socket.on("private message", ({ message, to, from}) => {
    io.to(roName).emit("private message", { message, to, from });
  });
//   io.on("disconnect", () => {
//     console.log("socket disconnected...");
//   });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.........`);
});
