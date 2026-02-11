import { useEffect, useRef } from "react";
import { socket } from "./useSocket";

export default function useWebRTC(roomId) {

  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const hasInitialized = useRef(false); // StrictMode protection

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    async function init() {
      try {
        // Get camera & mic
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Join socket room
        socket.emit("join-room", roomId);

        console.log("Joined room:", roomId);

      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }

    init();

    return () => {
      // Cleanup media
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };

  }, [roomId]);

  return {
    localVideoRef,
  };
}
