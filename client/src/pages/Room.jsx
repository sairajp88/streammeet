import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useWebRTC from "../hooks/useWebRTC";
import { socket } from "../hooks/useSocket";
import "../styles/room.css";

export default function Room() {
  const { roomId } = useParams();

  const {
    localVideoRef,
    remoteVideoRef,
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
  } = useWebRTC(roomId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

  function sendMessage() {
    if (!input.trim()) return;

    socket.emit("chat-message", { message: input, roomId });

    setMessages((prev) => [
      ...prev,
      { message: input, sender: socket.id },
    ]);

    setInput("");
  }

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

  return (
    <div className="room-container">
      {/* VIDEO AREA */}
      <div className="video-area">
        <div className="video-row">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="glass video-box"
          />

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="glass video-box"
          />
        </div>

        <div className="control-dock glass">
          <button onClick={toggleMute}>
            {isMuted ? "Unmute Mic" : "Mute Mic"}
          </button>

          <button onClick={toggleVideo}>
            {isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
          </button>

          <input type="file" onChange={sendFile} />
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="chat-panel glass">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === socket.id
                  ? "message-own"
                  : "message-other"
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
            placeholder="Type message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
