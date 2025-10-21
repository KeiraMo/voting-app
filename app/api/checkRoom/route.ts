/**
 * app/api/checkRoom/route.ts
 * 
 * API route to check if a voting room exists.
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("roomId");
    const rooms = await readRoomsFile();

    if (!id || !rooms[id]) {
        return NextResponse.json({ exists: false });
    }

    return NextResponse.json({ exists: true });
}