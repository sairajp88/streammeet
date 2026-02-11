import { useParams } from "react-router-dom";
import useWebRTC from "../hooks/useWebRTC";

export default function Room() {
  const { roomId } = useParams();
  const { localVideoRef } = useWebRTC(roomId);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="glass"
        style={{ width: "500px" }}
      />
    </div>
  );
}
