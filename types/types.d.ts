/**
 * Custom types for Next.js 
 */
// import { Server as HTTPServer } from "http";
// import { Socket } from "net";
// import { Server as IOServer } from "socket.io";

export type RoomUser = { 
    id: string; 
    name: string 
};

export type RoomState = {
  roomId: string;
  users: RoomUser[];
  votes: Record<string, { userId: string; value: string | number } | null>;
  isRevealed: boolean;
};