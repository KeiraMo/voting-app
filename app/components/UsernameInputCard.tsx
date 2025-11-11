/**
 * UI Component for users to input their name when they join a room.
 * app/components/UsernameInputCard.tsx
 */

import React from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Image from "next/image";
import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#472566',
    },
  },
});

interface UsernameInputCardProps {
    username: string;
    onClick: (name: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export default function UsernameInputCard({ username, onClick, onChange }: UsernameInputCardProps) {
    return (
        <Box
        component="form"
        sx={{ 
            m: 1, 
            width: 550,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            border: `5px solid ${theme.palette.primary.main}`,
            backgroundColor: 'white',
            borderRadius: 2,
        }}
        noValidate
        autoComplete="off"
        >
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, mt: 4, color: theme.palette.primary.main }}>
                Welcome to the Voting Room!
                <Typography variant="subtitle1" sx={{ flexGrow: 1, mt: 4, color: 'black' }}>
                    Enter the name you would like to use:
                </Typography>
            </Typography>
            <TextField
                required
                id="username-input"
                label="Username"
                value={username}
                onChange={onChange}
                sx={{
                    width: 220,
                    height: 70,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 4,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main, 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main, 
                        },

                    },
                }}
            />
            <Button
                onClick={() => onClick(username)}
                sx={{
                    m: 2,
                    width: 200,
                    height: 50,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                }}
                aria-label="Enter room with nickname"
            >
                <Image
                    src="/arrow-right.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                    className="inline-block ml-2 align-middle filter invert"
                />
            </Button>
        </Box>
    );
}
    