const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

/* -------------------- Basic Route -------------------- */
app.get("/", (req, res) => {
  res.send("StreamMeet Signaling Server Running");
});

/* -------------------- HTTP Server -------------------- */
const server = http.createServer(app);

/* -------------------- Socket.io Setup -------------------- */
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

/* -------------------- Socket Logic -------------------- */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  /* ---------- Join Room ---------- */
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId; // store roomId on socket instance

    console.log(`User ${socket.id} joined room ${roomId}`);

    const clients = io.sockets.adapter.rooms.get(roomId);
    const numberOfClients = clients ? clients.size : 0;

    console.log(`Room ${roomId} has ${numberOfClients} client(s)`);

    if (numberOfClients > 1) {
      socket.to(roomId).emit("user-joined", socket.id);
    }
  });

  /* ---------- WebRTC Signaling ---------- */

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  /* ---------- Chat (Phase 3) ---------- */

  socket.on("chat-message", ({ message, roomId }) => {
    socket.to(roomId).emit("chat-message", {
      message,
      sender: socket.id,
    });
  });

  /* ---------- File Sharing (Phase 3) ---------- */

  socket.on("file-share", ({ file, roomId }) => {
    socket.to(roomId).emit("file-share", file);
  });

  /* ---------- Disconnect Handling ---------- */

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

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
