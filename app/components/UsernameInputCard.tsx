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
}



export default function UsernameInputCard() {
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
                defaultValue=""
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
        </Box>
    );
}
    