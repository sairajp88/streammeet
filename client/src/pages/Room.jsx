import { useParams } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="glass" style={{ padding: "60px", textAlign: "center" }}>
        <h2>Room ID:</h2>
        <p>{roomId}</p>
      </div>
    </div>
  );
}
