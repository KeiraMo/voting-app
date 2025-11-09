/**
 * VoteCard Component
 * Displays a card with the voter's name and their selected vote value.
 * app/components/VoteCard.tsx
 */

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'; // Wrapper for the Card header
import CardContent from '@mui/material/CardContent'; // Wrapper for the Card content

interface VoteCardProps {
    name: string;
    voteValue?: React.ReactNode;
    isRevealed: boolean;
}


export default function VoteCard({ name, voteValue, isRevealed }: VoteCardProps) {
    return (
        <Card sx={{ width: 140, height: 200, margin: '1rem', backgroundColor: '#f5f5f5' }}>
            <CardHeader title={name} />
            <CardContent sx={{ fontSize: '35px', textAlign: 'center'}}>
                {isRevealed 
                    ? voteValue
                    : "-"}
            </CardContent>
        </Card>
    );
}

