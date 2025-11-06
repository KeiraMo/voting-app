/**
 * /room/page.tsx
 * 
 * Room page created by app/page.tsx
 * Page where users actually vote
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Initialize socket connection

export default function RoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");

    const [messages, setMessages] = useState<string[]>([]);

    const roomLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/room?roomId=${roomId}`;

    /**
     * Verifies if the room exists when the component mounts.
     */
    useEffect(() => {
        async function verifyRoom() {
            const response = await fetch(`/api/checkRoom?roomId=${roomId}`);
            const data = await response.json();

            if (!data.exists) {
                alert("Room does not exist. Redirecting to home page.");
                router.push("/");
            }
        }

        verifyRoom();
    }, [roomId, router]);

    /**
     * Initializes the WebSocket connection and joins the room.
     */
    useEffect(() => {
        if (!roomId) return;

        socket.on("connect", () => {
            console.log("Connected to WebSocket server with ID:", socket.id);
            socket.emit("joinRoom", roomId);
        });

        // Server sends a message
        socket.on("message", (data: { userId: string; message: string }) => {
            console.log("Message received:", data);
            setMessages((prevMessages) => [...prevMessages, `${data.userId}: ${data.message}`]);
        });

        // Cleanup when leaving the page
        return () => {
            socket.off("connect");
            socket.off("message");
            socket.disconnect();
        };
    }, [roomId]);

    // Send message to server
    const sendMessage = (message: string) => {
        if (!message.trim()) return;
        socket.emit("message", { roomId, message });
    };

    /**
    * Copies the current Room ID to the clipboard.
    * @return void
    */
    const copyToClipboard = async () => {
        console.log("Copy button clicked");
        if (roomLink) {
            try {
                await navigator.clipboard.writeText(roomLink);
                alert("Room link copied to clipboard!");
                console.log("Room link copied to clipboard: ", roomLink);
            } catch (err) {
                console.error("Failed to copy Room link: ", err);
            }
        }
    };

    const handleVoteSelection = (value: string | number) => {
        console.log("Vote selected:", value);
        // If the "?" button is clicked, send a test message
        if (value) {
            sendMessage(`Test message from ${value}`);
    }
    };

    // Button fibonacci vote values
    const voteValues = ["?", 1, 2, 3, 5, 8, 13];

    return (
        <main className="min-h-screen flex flex-col items-center p-8 text-center">
            {/* Room Header */}
            <h1 className="text-3xl font-bold mb-4 bg-gray-200 text-gray-900 px-2 py-1 rounded">
                Welcome to Room {roomId}
            </h1>
            {/* Room link box */}
            <div className="font-mono bg-gray-200 text-gray-900 px-2 py-1 rounded">
                <p className="text-lg flex items-center">
                    Room ID - Share this link to invite others: <span className="font-mono bg-gray-400 text-gray-900 px-2 py-1 rounded">{roomId}</span>
                    <button onClick={copyToClipboard} className="hover:opacity-70 px-2 py-1">
                        <Image
                            src="/copy.svg"
                            alt="Copy room ID"
                            width={20}
                            height={20}
                        />
                    </button>
                </p>
            </div>
            {/* Voting buttons */}
             <div className="flex flex-row gap-4 mt-8">
                    {voteValues.map((value) => (
                        <button
                            key={value}
                            onClick={() => handleVoteSelection(value)}
                            className="w-16 h-16 bg-white text-black font-bold rounded shadow hover:bg-gray-300 transition focus:outline-2 focus:outline-offset-2 focus:outline-gray-50"
                        >
                            {value}
                        </button>
                    ))}
                </div>
        </main>
    );
}


