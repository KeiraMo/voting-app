/**
 * Socket.io setup for live voting updates
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


io.on("connection", async (socket) => {
    console.log("New client connected:", socket.id);
})

httpServer.listen(3001, () => {
    console.log("Server listening on port 3001");
})
