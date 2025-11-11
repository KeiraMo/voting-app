/**
 * /room/page.tsx
 * 
 * Room page created by app/page.tsx
 * Page where users actually vote
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import type * as Types from "../../types/types";
import { Socket } from "socket.io";

import RoomHeader from "../components/RoomHeader";
import VotingButtons from "../components/VotingButtons";
import VoteCard from "../components/VoteCard";
import RevealVoteButton from "../components/RevealVoteButton";
import Footer from "../components/Footer";
import UsernameInputCard from "../components/UsernameInputCard";

// --- Constants --- //
const socket = io("http://localhost:3001"); // Initialize socket connection
const VOTE_OPTIONS = ["?", 1, 2, 3, 5, 8, 13]; // Button fibonacci vote values

// --- Main Room Page Component --- //

export default function RoomPage() {
    // Router and params //
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId") ?? "";

    // --- States ---
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [joined, setJoined] = useState<boolean>(false);
    const [roomState, setRoomState] = useState<Types.RoomState | null>(null);
    const [selectedVote, setSelectedVote] = useState<string | number | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const roomLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/room?roomId=${roomId}`;

    // --- Effects ---

    // Verifies if the room exists when the component mounts
    useEffect(() => {
        async function verifyRoom() {
            const response = await fetch(`/api/checkRoom?roomId=${roomId}`);
            const data = await response.json();

            if (!data.exists) {
                alert("Room does not exist. Redirecting to home page.");
                router.push("/");
            }
        }
        if (roomId) verifyRoom();
    }, [roomId, router]);

    // Socket connection and listeners
    useEffect(() => {
        if (!roomId) return;
        socket.on("connect", () => {
            console.log("Connected to WebSocket server with ID:", socket.id);
            // socket.emit("joinRoom", roomId);
        });
        // Cleanup when leaving the page
        return () => {
            socket.off("connect");
            socket.off("message");
            socket.disconnect();
        };
    }, [roomId]);

    // Load username from localStorage after mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedName = localStorage.getItem("username");
            if (storedName) setUsername(storedName);
        }
    }, []);

    // Saves username to localStorage when it changes.
    useEffect(() => {
        if (username) localStorage.setItem("username", username);
    }, [username]);


    // --- Handlers ---
    
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

    const handleJoin = (name: string) => {
        console.log("join button clicked - handle join entered");
        if (!name || name.trim() === "") {
            return alert("Please enter a valid username.");
        }
        setUsername(name);
        console.log("username set");
        setJoined(true);
        console.log("joined set to true");
        console.log("Emitting joinRoom with:", { roomId, username: name });
        socket.emit("joinRoom", { roomId, username: name });
        console.log("joinRoom emitted");
        
    }
        
    // --- Render --- //
    return (
        <main className="min-h-screen flex flex-col items-center p-8 text-center">
            {(!joined ?
                <div className="flex items-center justify-center w-full h-full">    
                    <UsernameInputCard
                        username={username}
                        onClick={handleJoin}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            :
                <>
                    <RoomHeader roomId={roomId} onCopy={copyToClipboard} />
                    <VotingButtons
                        voteOptions={VOTE_OPTIONS}
                        selectedVote={selectedVote}
                        onVoteSelect={handleVoteSelection}
                    />
                    <VoteCard name={username} voteValue={selectedVote} isRevealed={isRevealed} />
                    <RevealVoteButton onClick={handleReveal} />
                    <Footer />
                </>
            )}
        </main>
    );
}


