/**
 * Button for creating a new room
 * app/components/CreateRoomButton.tsx
 */

import React from "react";
import Image from "next/image";

interface CreateRoomButtonProps {
    onClick: () => void;
    loading: boolean;
}

export default function CreateRoomButton({ onClick, loading }: CreateRoomButtonProps) {
    return (
        <button
            className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition"
            onClick={onClick}
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
    );
}