/**
 * Header for the Room Page with the room ID display and copy functionality
 * app/components/RoomHeader.tsx
 */

import React from "react";
import Image from "next/image";

interface RoomHeaderProps {
    roomId: string;
    onCopy: () => void;
}

export default function RoomHeader({ roomId, onCopy }: RoomHeaderProps) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 bg-gray-200 text-gray-900 px-2 py-1 rounded">
                Welcome to Room {roomId}
            </h1>
            {/* Room link box */}
            <div className="font-mono bg-gray-200 text-gray-900 px-2 py-1 rounded">
                <p className="text-lg flex items-center">
                    Room ID - Share this link to invite others: <span className="font-mono bg-gray-400 text-gray-900 px-2 py-1 rounded">{roomId}</span>
                    <button onClick={onCopy} className="hover:opacity-70 px-2 py-1">
                        <Image
                            src="/copy.svg"
                            alt="Copy room ID"
                            width={20}
                            height={20}
                        />
                    </button>
                </p>
            </div>
        </div>
    );
}
