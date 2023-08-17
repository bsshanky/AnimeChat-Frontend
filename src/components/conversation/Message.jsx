import React, { useEffect, useRef } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { Trash } from 'phosphor-react';

const Message = ({messages, onDeleteMessage, userId}) => {

    const theme = useTheme();
    const lastMessageRef = useRef(null); // Create a ref for the last message element
    const colors = ["purple", "yellow", "green", "blue", "brown"];

    useEffect(() => {
        // Scroll to the last message when the component is loaded
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, []); // The empty dependency array ensures this effect runs only once

    return (

        messages.length === 0 ?

            <Stack sx={{width: "100%", height: "100%"}} alignItems={"center"} justifyContent={"center"}>
                <Typography  variant='subtitle1'>No messages here. Why don't you start a conversation?</Typography>
            </Stack>

        :

            <Box p={3}>

                {/* Background for the wallpaper */}

                <Stack spacing={3} direction="column"> 
                    {messages.map((message, index) => (
                        <Stack key={message._id} 
                        direction="row" 
                        justifyContent={message.senderId === userId ? "end" : "start"}
                        ref={index === messages.length - 1 ? lastMessageRef : null} // Set ref for the last message
                        >
                            <Box p={1.5} 
                            sx={{backgroundColor: message.senderId === userId ? theme.palette.primary.main : "#D3D3D3", 
                            borderRadius: 1.5, 
                            width: "max-content",
                            maxWidth: 200, // Set the maximum width
                            overflowWrap: "break-word", // Word wrap for long messages
                            }}
                            >
                                <Stack direction="column" spacing={1} sx={{height: "100%", width: "100%"}}>

                                    <Typography variant="body1" 
                                    fontWeight="bold" 
                                    color={message.senderId === userId ? "rgb(255, 108, 0)" : colors[Math.floor(Math.random() * 5)]}>
                                        {message.senderName}
                                    </Typography>

                                    <Typography variant='body2' color={message.senderId === userId ? "white" : "black"}>
                                        {message.message}
                                    </Typography>    

                                    {message.senderId === userId ? (

                                        <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                            <Typography variant='caption' fontWeight={"light"} color={"#d3d3d3"}>
                                                {moment(message.timestamp).format("DD/MM/YY HH:MM")}
                                            </Typography>

                                            <IconButton sx={{ width: "max-content", color: "#fff" }}
                                            onClick={() => onDeleteMessage(message._id, index)} // Call the callback function
                                            >
                                                <Trash />
                                            </IconButton>
                                        </Stack>
                                        
                                    ) : 
                                    
                                    <Typography variant='caption' fontWeight={"light"} color={"#2a2a2a"}>
                                        {moment(message.timestamp).format("DD/MM/YY HH:MM")}
                                    </Typography>

                                    }

                                </Stack>

                            </Box>
                        </Stack>

                    ))}
                </Stack>

            </Box>
    )
}

export default Message;

// 

