import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../hooks/useSocket";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="glass" style={{ padding: "60px", textAlign: "center" }}>
        <h1>StreamMeet</h1>

        <p style={{ marginBottom: "30px" }}>
          Premium Real-Time Communication
        </p>

        <button
          onClick={createRoom}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            background: "var(--forest-primary)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
