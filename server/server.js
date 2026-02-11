const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* -------------------- CORS -------------------- */

const allowedOrigins = [
  process.env.CLIENT_URL,   // production frontend
  "http://localhost:5173",  // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  })
);

/* -------------------- Health Route -------------------- */

app.get("/", (req, res) => {
  res.status(200).send("StreamMeet Signaling Server Running");
});

/* -------------------- HTTP Server -------------------- */

const server = http.createServer(app);

/* -------------------- Socket Setup -------------------- */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

/* -------------------- Socket Logic -------------------- */

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;

    const clients = io.sockets.adapter.rooms.get(roomId);
    const numberOfClients = clients ? clients.size : 0;

    if (numberOfClients > 1) {
      socket.to(roomId).emit("user-joined", socket.id);
    }
  });

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on("chat-message", ({ message, roomId }) => {
    socket.to(roomId).emit("chat-message", {
      message,
      sender: socket.id,
    });
  });

  socket.on("file-share", ({ file, roomId }) => {
    socket.to(roomId).emit("file-share", file);
  });

  socket.on("disconnect", () => {
    if (socket.roomId) {
      socket.to(socket.roomId).emit("user-left", socket.id);
    }
  });
});

/* -------------------- Start Server -------------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});