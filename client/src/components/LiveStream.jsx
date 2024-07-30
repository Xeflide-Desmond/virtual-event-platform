import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LiveStream = ({ roomId }) => {
  const videoRef = useRef();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", roomId);

    socket.on("signal", async (data) => {
      // Handle WebRTC signaling here
    });

    return () => {
      socket.off("signal");
    };
  }, [socket, roomId]);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error.message);
      }
    };

    startVideo();
  }, []);

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
};

export default LiveStream;
