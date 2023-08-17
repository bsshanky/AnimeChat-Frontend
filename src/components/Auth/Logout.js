import React from 'react';
import {googleLogout} from '@react-oauth/google';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { SignOut } from 'phosphor-react';

function Logout({ setUser }) {

    const onclick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        console.log('Logout made successfully');
    }

    return (
        <Box alignItems={"center"} sx={{width: 150, height: 45, borderRadius: 1.5, backgroundColor: '#fff'}}>
            <IconButton sx={{width: "100%", 
            height: "100%",
            backgroundColor: "transparent",  // Set background to transparent
                    "&:hover": {
                        backgroundColor: "transparent",  // Remove background on hover
            }}}
                disableRipple
                onClick={onclick}
            >
            <Stack sx={{width: "100%", height: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                <Typography variant='subtitle1' fontWeight={"bold"}>Sign Out</Typography>
                <SignOut />
            </Stack>
            </IconButton>
        </Box>
    );
}

export default Logout;