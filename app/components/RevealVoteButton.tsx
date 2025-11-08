/**
 * RevealVoteButton Component
 * Button that triggers the cards to reveal their votes.
 * app/components/RevealVoteButton.tsx
 */
import * as React from 'react';

interface RevealVoteButtonProps {
    onClick: () => void;
}

export default function RevealVoteButton({ onClick }: RevealVoteButtonProps) {
    return (
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={onClick}
        >
            Reveal Votes
        </button>
    );
}