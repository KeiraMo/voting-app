/**
 * Socket.io setup for live voting updates and per-room communication.
 * /server.ts
 */
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";

// Type defs
type RoomUser = { 
    userId: string; 
    username: string 
};
type RoomData = {
  roomId: string;
  users: RoomUser[];
  votes: Record<string, number | string | null>;
  isRevealed: boolean;
};


export function saveRoomsToFile() {
    console.log("saveRoomsToFile - Saving rooms data to file...");
    fs.writeFileSync("rooms.json", JSON.stringify(Object.fromEntries(roomsData), null, 2));
}

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
    socket.on("joinRoom", (payload: { roomId: string; userId?: string; username: string }) => {
        console.log("Entering joinRoom handler");
        const { roomId, username } = payload;
        if (!username || !roomId) {
            console.error("joinRoom: Missing username or roomId");
            return;
        }
        const uid = socket.id; // Use socket ID as user ID

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
        const existingUserIndex = room.users.findIndex((user: RoomUser) => user.userId === uid);
        if (existingUserIndex === -1) {
            room.users.push({ userId: uid, username: socket.data.username });
            room.votes[uid] = null; // Initialize vote
        } else {
            // Update existing user
            room.users[existingUserIndex].username = socket.data.username;
        }

        // Broadcast updated room state or user list to everyone in that room
        io.to(roomId).emit("roomState", room);
        io.to(roomId).emit("userJoined", { userId: uid, username: socket.data.username });
        saveRoomsToFile();
        console.log("After join:", JSON.parse(fs.readFileSync("rooms.json", "utf-8")));
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
        room.users = room.users.filter((u: RoomUser) => u.userId !== socket.data.userId);
        delete room.votes[socket.data.userId];
        io.to(roomId).emit("roomState", room);
        io.to(roomId).emit("userLeft", { userId: socket.data.userId });
        saveRoomsToFile();
    });
  });
});



httpServer.listen(3001, () => {
    console.log("Server listening on port 3001");
})
