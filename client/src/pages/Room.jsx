import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useWebRTC from "../hooks/useWebRTC";
import { socket } from "../hooks/useSocket";
import "../styles/room.css";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    cleanup, // 🔥 important
  } = useWebRTC(roomId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  /* -------------------- CHAT + FILE LISTENERS -------------------- */

  useEffect(() => {
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("file-share", (file) => {
      const link = document.createElement("a");
      link.href = file.data;
      link.download = file.name;
      link.click();
    });

    return () => {
      socket.off("chat-message");
      socket.off("file-share");
    };
  }, []);

  /* -------------------- SEND MESSAGE -------------------- */

  function sendMessage() {
    if (!input.trim()) return;

    socket.emit("chat-message", { message: input, roomId });

    setMessages((prev) => [
      ...prev,
      { message: input, sender: socket.id },
    ]);

    setInput("");
  }

  /* -------------------- FILE SHARE -------------------- */

  function sendFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      socket.emit("file-share", {
        file: {
          name: file.name,
          data: reader.result,
        },
        roomId,
      });
    };

    reader.readAsDataURL(file);
  }

  /* -------------------- LEAVE MEETING -------------------- */

  function leaveMeeting() {
    cleanup();          // 🔥 stop camera + mic immediately
    socket.disconnect(); // 🔥 disconnect socket cleanly
    navigate("/");       // 🔥 go back to home
  }

  return (
    <div className="room-container">

      {/* ================= MAIN VIDEO AREA ================= */}

      <div className="main-video-area">

        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="main-speaker glass"
        />

        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="self-view glass"
        />

        {/* ================= CONTROL DOCK ================= */}

        <div className="control-dock glass">

          <button onClick={toggleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </button>

          <button onClick={toggleVideo}>
            {isVideoOff ? "Camera On" : "Camera Off"}
          </button>

          <button onClick={() => setIsChatOpen(!isChatOpen)}>
            {isChatOpen ? "Close Chat" : "Chat"}
          </button>

          <label className="file-label">
            Share
            <input type="file" onChange={sendFile} hidden />
          </label>

          <button className="leave-btn" onClick={leaveMeeting}>
            Leave
          </button>

        </div>
      </div>

      {/* ================= CHAT PANEL ================= */}

      <div className={`chat-panel glass ${isChatOpen ? "open" : ""}`}>

        <div className="chat-header">
          <h3>Meeting Chat</h3>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === socket.id
                  ? "chat-bubble own"
                  : "chat-bubble other"
              }
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write something thoughtful..."
          />
          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}