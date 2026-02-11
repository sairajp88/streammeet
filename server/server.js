const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("StreamMeet Signaling Server Running");
});

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    const clients = io.sockets.adapter.rooms.get(roomId);
    const numberOfClients = clients ? clients.size : 0;

    console.log(`Room ${roomId} has ${numberOfClients} client(s)`);

    // Notify existing user if someone joins
    if (numberOfClients > 1) {
      socket.to(roomId).emit("user-joined", socket.id);
    }

    // Forward offer
    socket.on("offer", ({ offer, roomId }) => {
      socket.to(roomId).emit("offer", offer);
    });

    // Forward answer
    socket.on("answer", ({ answer, roomId }) => {
      socket.to(roomId).emit("answer", answer);
    });

    // Forward ICE candidates
    socket.on("ice-candidate", ({ candidate, roomId }) => {
      socket.to(roomId).emit("ice-candidate", candidate);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      socket.to(roomId).emit("user-left", socket.id);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
