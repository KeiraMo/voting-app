import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'; // Wrapper for the Card header
import CardContent from '@mui/material/CardContent'; // Wrapper for the Card content

interface VoteCardProps {
    name: string;
    children?: React.ReactNode;
}

export default function VoteCard({ name, children }: VoteCardProps) {
    return (
        <Card sx={{ maxWidth: 345, margin: '1rem', backgroundColor: '#f5f5f5' }}>
            <CardHeader title={name} />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}