/**
 * /room/page.tsx
 * 
 * Room page created by app/page.tsx
 * Page where users actually vote
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import VoteCard from "../components/VoteCard";
import RevealVoteButton from "../components/RevealVoteButton";
import RoomHeader from "../components/RoomHeader";
import VotingButtons from "../components/VotingButtons";
import Footer from "../components/Footer";

const socket = io("http://localhost:3001"); // Initialize socket connection

export default function RoomPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId") ?? "";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [messages, setMessages] = useState<string[]>([]);
    const [selectedVote, setSelectedVote] = useState<string | number | null>(null);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    const roomLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/room?roomId=${roomId}`;
    const voteOptions = ["?", 1, 2, 3, 5, 8, 13]; // Button fibonacci vote values

    // EFFECTS //

    // Verifies if the room exists when the component mounts.
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

    // Initializes the WebSocket connection and joins the room.
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

    // HANDLERS //
    
    // Copies the current Room ID to the clipboard.
    const copyToClipboard = async () => {
        if (roomLink) {
            try {
                await navigator.clipboard.writeText(roomLink);
                alert("Room link copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy Room link: ", err);
            }
        }
    };

    const handleVoteSelection = (value: string | number) => {
        console.log("Vote selected:", value);
        setSelectedVote(value); // Update selected vote state locally for display
        socket.emit("message", { roomId, message: `Vote selected: ${value}` });
    };

    const handleReveal = () => {
        console.log("Reveal votes clicked");
        setIsRevealed(true);
        socket.emit("message", { roomId, message: "Votes have been revealed!" });
    };
        
    // RENDER //
    return (
        <main className="min-h-screen flex flex-col items-center p-8 text-center">
            <RoomHeader roomId={roomId} onCopy={copyToClipboard} />
            <VotingButtons
                voteOptions={voteOptions}
                selectedVote={selectedVote}
                onVoteSelect={handleVoteSelection}
            />
            <VoteCard name="Me" voteValue={selectedVote} isRevealed={isRevealed} />
            <RevealVoteButton onClick={handleReveal} />
            <Footer />
        </main>
    );
}


