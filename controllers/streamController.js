const { Server } = require("socket.io");

let io;

const startSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    });

    socket.on("signal", (data) => {
      const { signal, room } = data;
      socket.to(room).emit("signal", signal);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};

module.exports = { startSocketServer };
