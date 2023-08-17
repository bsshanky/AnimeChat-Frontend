import React from "react";
import { Box, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const GroupElement = ({ logo, selected, onClick }) => {

    const theme = useTheme();
    const backgroundColor = selected ? theme.palette.primary.main : 'gray';

    return (
        <Box 
            position="relative" 
            sx={{
                backgroundColor,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", 
                height: 100, 
                width: "100%",
                borderRadius: 2.5
            }}
        >
            <IconButton 
            sx={{width: "100%", 
            height: "100%",
            backgroundColor: "transparent",  // Set background to transparent
                    "&:hover": {
                        backgroundColor: "transparent",  // Remove background on hover
            }}}
            disableRipple
            onClick={onClick}>
                <img 
                    src={logo} 
                    style={{ 
                        maxWidth: "100%", 
                        maxHeight: "100%", 
                        display: "block", 
                        objectFit: "contain", 
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        margin: "auto"
                    }} 
                    alt='Anime Logo'
                />
            </IconButton>
        </Box>
    );
}

export default GroupElement;

