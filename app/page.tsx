/**
 * app/page.tsx
 * 
 * This is the home/login page of the application.
 */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import HomeHeader from "./components/HomeHeader";
import CreateRoomButton from "./components/CreateRoomButton";
import Footer from "./components/Footer";

// const roomLink = "http://localhost:3000/room?roomId=TBE94C"; -> for testing so rooms arent repeatedly created

// Main Home Page Component
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Creates a new room by calling the API and navigates the user to the newly created room.
   * @return void
   */
  const createAndJoinRoom = async (): Promise<void> => {
    setLoading(true);
    const response = await fetch('/api/createRoom', { method: 'POST' });
    const data = await response.json();
    console.log("Generating room", data.roomId);
    router.push(`/room?roomId=${data.roomId}`); // Navigate to the room page with the new Room ID
  }

   return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <HomeHeader />
      <div className="flex flex-col items-center gap-4 border-2 border-gray-300 rounded-xl p-6 bg-white shadow-md">
        <CreateRoomButton loading={loading} onClick={createAndJoinRoom} />
      </div>
      <Footer />
    </main>
  );
}
