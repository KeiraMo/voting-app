/**
 * Socket.io setup for live voting updates and per-room communication.
 * /server.ts
 */
import { createServer } from "http";
import { Server } from "socket.io";

import fs from "fs";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Map to hold room data in memory
const fileData = JSON.parse(fs.readFileSync("rooms.json", "utf-8")); // Load existing rooms from file
const roomsData = new Map<string, any>(Object.entries(fileData)); // roomId -> roomData

// Socket connection for new client
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a specific room
    socket.on("joinRoom", (payload: { roomId: string; userId: string; username: string }) => {
        const { roomId, userId, username } = payload;
        const uid = socket.id;

        // Save username to socket
        socket.data.userId = uid;
        socket.data.username = username ?? `User-${uid.slice(0,5)}`; // Default username if not provided

        // Join socket room
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        if (!roomsData.get(roomId)) {
            roomsData.set(roomId, {
                roomId,
                users: [],
                votes: {},
                isRevealed: false,
            })
        }
        const room = roomsData.get(roomId)!;

        // Add/update user
        const existingUserIndex = room.users.findIndex((user: any) => user.userId === uid);
        if (existingUserIndex === -1) {
            room.users.push({ userId: uid, username: socket.data.username });
            room.votes[uid] = null; // Initialize vote
        } else {
            existingUserIndex.username = socket.data.username;
        }

         // Broadcast updated room state or user list to everyone in that room
        io.to(roomId).emit("roomState", room);
        io.to(roomId).emit("userJoined", { userId: uid, username: socket.data.username });
    });

    // Listen for a message event 
    socket.on("message", (data: { roomId: string; message: string }) => {
        console.log(`Message from ${socket.id} in room ${data.roomId}: ${data.message}`);
        
        // Broadcast the message to others in the room
        io.to(data.roomId).emit("message", { userId: socket.id, message: data.message });
    });

    socket.on("disconnecting", () => {
    // For each room the socket is in, remove user and broadcast update
    const myRooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    myRooms.forEach((roomId) => {
      const room = roomsData.get(roomId);
      if (!room) return;
      room.users = room.users.filter(u => u.userId !== socket.data.userId);
      delete room.votes[socket.data.userId];
      io.to(roomId).emit("roomState", room);
      io.to(roomId).emit("userLeft", { userId: socket.data.userId });
    });
  });
});



httpServer.listen(3001, () => {
    console.log("Server listening on port 3001");
})
