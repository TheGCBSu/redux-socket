const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("We are connected");

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User with ID: ${data.username} joined room: ${data.room}`);
  });
  socket.on("send_data", (data) => {
    console.log(`Server received Data: ${JSON.stringify(data)}`);
    io.to(data.room).emit(data.type, data);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});
server.listen(5000, () => {
  console.log("listening on *:5000");
});
