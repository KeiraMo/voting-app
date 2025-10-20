/**
 * This is the home/login page of the application.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


// Main Home Page Component
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Generates a random Room ID.
   * @return void
   */
  function createAndJoinRoom(): void {
    setLoading(true);
    console.log("Generate button clicked");
    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log("Generating room", newId);
    router.push(`/room?roomId=${newId}`); // Navigate to the room page with the new Room ID
  }

   return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="border-4 border-purple-950 rounded-xl px-4 py-4 shadow-md flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-white">You Better Vote!</h1>
      </div>

      <div className="flex flex-col items-center gap-4 border-2 border-gray-300 rounded-xl p-6 bg-white shadow-md">
        <button
          className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
          onClick={createAndJoinRoom}
          disabled={loading}
        >
          {loading ? "Creating Room..." : "Create & Join Room"}
          <Image
              src="/log-in.svg"
              alt="log-in arrow"
              width={20}
              height={20}
              className="inline-block ml-2 align-middle filter invert"
            />
        </button>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        Built by Keira the #Intern
      </footer>
    </main>
  );
}
