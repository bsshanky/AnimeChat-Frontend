import React, { useRef} from "react";
import { Avatar, Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';
import { PaperPlaneTilt } from "phosphor-react";
import Message from "./Message";
import { AnimeGroups } from "../../data/logoImages";
import moment from "moment";

import nezukoImage from '../../assets/images/nezuko.png'

const StyledInput = styled(TextField)(() => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px"
    }
}))

const Conversation = ({ 
  selectedGroup, 
  messages,
  setNewMessage,
  deleteMessage, 
  user }) => {

  const theme = useTheme();
  const currentGroupInfo = AnimeGroups.find((group) => group.groupId === selectedGroup)
  const filteredMessages = messages.filter((message) => message.groupId === selectedGroup);
  const messageInputRef = useRef();

  const handleSubmit = () => {
    const enteredMessage = messageInputRef.current.value
    if (enteredMessage.trim() !== "") {

      const newMessage = {
        groupId: selectedGroup,
        senderId: user.googleId,
        senderName: user.name,
        message: enteredMessage,
        timestamp: moment().toISOString(),
      };

      setNewMessage(newMessage.message);
      messageInputRef.current.value = "";
    }
  };

  const handleDeleteMessage = (messageId, index) => {
    deleteMessage(messageId, index);
  };

  return (
    <Stack height={"100%"} maxHeight={"100%"} width={"auto"}>
        {/* Chat header */}
        <Box p={3} sx={{ backgroundColor: "#f8faff", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}>
            <Stack direction="row" alignItems="center" spacing={3} sx={{width: "100%", height: "100%"}}>

                <Avatar src={currentGroupInfo.icon} />

                <Typography variant="h5" fontWeight={"bold"}>{currentGroupInfo.groupName}</Typography>

            </Stack>
        </Box>


        {/* Messages */}
        <Box overflowY={"auto"} width={"100%"} sx={{flexGrow: 1, height: "100%", overflowY: user ? "scroll" : null}}>
          {user ? 
          
            <Message messages={filteredMessages} 
              onDeleteMessage={handleDeleteMessage}
              userId={user.googleId}
             />
          : 

          <Stack p={5} direction={"column"} sx={{height: "100%", alignItems: "center", justifyContent: "center"}}>
            <Typography variant="h2">Login to view messages.</Typography>
            <img src={nezukoImage} height={300} width={250} alt="Character"/>
          </Stack>

          }
            
        </Box>


        {/* Chat footer */}
        <Box p={3} sx={{ backgroundColor: "#f8faff", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}>
            <Stack direction="row" alignItems="center" spacing={3} sx={{width: "100%", height: "100%"}}>
                <StyledInput disabled={!user} 
                inputRef={messageInputRef}
                fullWidth 
                placeholder={user ? "Share your thoughts..." : "Login to start messaging"} 
                variant="filled"  
                InputProps={{
                    disableUnderline: true
                }} 
                />

                <Box sx={{width: 48, height: 48, backgroundColor: user ? theme.palette.primary.main : "gray", borderRadius: 2.5}}>
                    <Stack sx={{height: "100%", width: "100%"}} alignItems="center" justifyContent="center">
                        <IconButton disabled={!user} onClick={handleSubmit}>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                    
                </Box>
            </Stack>
        </Box>

    </Stack>
  );
};

export default Conversation;
