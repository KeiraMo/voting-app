/**
 * Buttons to select vote
 * app/components/VotingButtons.tsx
 */

import React from "react";

interface VotingButtonProps {
   
    voteOptions: (string | number)[];
    selectedVote: string | number | null;
    onVoteSelect: (value: string | number) => void;

}

export default function VotingButtons({ voteOptions, selectedVote, onVoteSelect }: VotingButtonProps) {
    return (
        <div className="flex flex-row gap-4 mt-8">
            {voteOptions.map((value) => (
                <button
                    key={value}
                    onClick={() => onVoteSelect(value)}
                    className={`w-16 h-16 bg-white text-black font-bold rounded shadow hover:bg-gray-300 transition ${
                        selectedVote === value
                        ? 'outline-2 outline-offset-2 outline-gray-50'
                        : 'bg-white text-black hover:bg-gray-300'
                    }`}
                >
                    {value}
                </button>
            ))}
        </div>
    )
}
                