/**
 * Socket.io setup for live voting updates and per-room communication.
 * /server.ts
 */
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket connection for new client
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a specific room
    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        // Notify others in the room
        socket.to(roomId).emit("userJoined", { userId: socket.id });
    });

    // Listen for a message event 
    socket.on("message", (data: { roomId: string; message: string }) => {
        console.log(`Message from ${socket.id} in room ${data.roomId}: ${data.message}`);
        
        // Broadcast the message to others in the room
        io.to(data.roomId).emit("message", { userId: socket.id, message: data.message });
    });
});



httpServer.listen(3001, () => {
    console.log("Server listening on port 3001");
})
