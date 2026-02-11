import { useEffect, useRef } from "react";
import { socket } from "./useSocket";

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
};

export default function useWebRTC(roomId) {

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peerConnectionRef.current = new RTCPeerConnection(configuration);

        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // 🔥 ICE emission
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              roomId,
            });
          }
        };

        socket.emit("join-room", roomId);

        console.log("Peer connection ready");

      } catch (err) {
        console.error("WebRTC init error:", err);
      }
    }

    init();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }

      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };

  }, [roomId]);

  useEffect(() => {

    socket.on("user-joined", async () => {
      console.log("User joined. Creating offer...");

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socket.emit("offer", { offer, roomId });
    });

    socket.on("offer", async (offer) => {
      console.log("Received offer");

      await peerConnectionRef.current.setRemoteDescription(offer);

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socket.emit("answer", { answer, roomId });
    });

    socket.on("answer", async (answer) => {
      console.log("Received answer");

      await peerConnectionRef.current.setRemoteDescription(answer);
    });

    // 🔥 ICE reception
    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding ICE candidate", err);
      }
    });

  }, [roomId]);

  return {
    localVideoRef,
    remoteVideoRef,
  };
}
