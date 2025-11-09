/**
 * /api/createRoom/route.ts
 * 
 * API route to create a new voting room.
 */

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ACTIVE_ROOMS_FILE = path.join(process.cwd(), 'rooms.json');


async function readRoomsFile(): Promise<{ [key: string]: boolean }> {
    try {
        const data = await fs.readFile(ACTIVE_ROOMS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading rooms file:", error);
        return {};
    }
}

async function writeRoomsFile(rooms: { [key: string]: boolean }): Promise<void> {
    try {
        await fs.writeFile(ACTIVE_ROOMS_FILE, JSON.stringify(rooms, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing rooms file:", error);
    }
}

/**
 * Creates a new voting room via a HTTP POST request.
 * @returns A JSON response containing the new room ID.
 */
export async function POST() {
    const rooms = await readRoomsFile(); 
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a 6-character room ID
    
    console.log("Created new room with ID:", roomId);
    rooms[roomId] = true; // Store the new room ID

    await writeRoomsFile(rooms);
    console.log("Active rooms updated:", Object.keys(rooms));
    return NextResponse.json({ roomId });
}

/** DEBUG 
 * /api/createRoom in browser to see active rooms.
 * @returns A JSON response containing all active room IDs.
*/
export async function GET () {
    const rooms = await readRoomsFile();
    return NextResponse.json({ activeRooms: Object.keys(rooms) });
}

