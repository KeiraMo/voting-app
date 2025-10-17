/**
 * This is the start/login page of the application.
 */
"use client";
import { useState } from "react";
import Image from "next/image";


// Main Home Page Component
export default function Home() {
   const [roomId, setRoomId] = useState<string | null>(null);

   function generateRoomID(): string {

    console.log("Generate button clicked: Generating Room ID");
    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newId);
    return newId;
  }

  function copyToClipboard() {
    console.log("Copy button clicked");
  }

   return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-purple-800 border-4 border-purple-950 rounded-xl px-4 py-4 shadow-md flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-white">You Better Vote!</h1>
      </div>

      <div className="flex flex-col items-center gap-4 border-2 border-gray-300 rounded-xl p-6 bg-white shadow-md">
        <button
          className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
          onClick={generateRoomID}
        >
          Generate Room ID
        </button>
        <p className="text-lg font-medium text-gray-900">
          Room ID: <span className="font-mono bg-gray-200 text-gray-900 px-2 py-1 rounded">{roomId}</span>
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

      <footer className="mt-12 text-gray-500 text-sm">
        Built by Keira the #Intern
      </footer>
    </main>
  );
}
