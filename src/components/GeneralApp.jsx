import React, { useState, useEffect, useCallback } from "react";
import GroupChats from "./GroupChats";
import Conversation from "./conversation/Conversation";
import { Box, Stack } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import MessagesDataService from "../services/messages";

const GeneralApp = () => {
  const [user] = useOutletContext();
  const [selectedGroup, setSelectedGroup] = useState(
    localStorage.getItem("selectedGroup") || "573a1390f29313caabcd4135"
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const retrieveGroupMessages = useCallback(() => {
    MessagesDataService.getMessagesByGroupId(selectedGroup)
      .then((response) => {
        setMessages(response.data.messages);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedGroup]);

  useEffect(() => {
    if (user) {
      retrieveGroupMessages();
    }
  }, [user, selectedGroup, retrieveGroupMessages]);

  //----------------------------------------------------------------------------------------------------------------

  const addMessage = useCallback(() => {
    if (newMessage.trim() !== "") {
      MessagesDataService.addMessage(
        selectedGroup,
        user.name,
        user.googleId,
        newMessage
      )
        .then((response) => {
          if (response.data.status === "success") {
            setNewMessage("");
            retrieveGroupMessages(); // Fetch updated messages
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, newMessage, retrieveGroupMessages, selectedGroup]);

  useEffect(() => {
    if (user) {
      addMessage();
    }
  }, [user, addMessage, newMessage]);

  //----------------------------------------------------------------------------------------------------------------
  // TODO: Delete selected message

  // const deleteMessage = async (messageId, index) => {
  //   try {
  //       var data = {
  //           messageId: messageId
  //       }
  //     await MessagesDataService.deleteMessage(data);
  //     console.log(await MessagesDataService.deleteMessage(data))
  //     setMessages((prevState) => {
  //       const newState = [...prevState]; // Create a new array using spread operator
  //       newState.splice(index, 1); // Remove the element at the specified index
  //       return newState; // Return the updated array
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Deleted count is 0. It has to be 1. What is wrong here?
  // const deleteMessage = (messageId, index) => {

  //       var data = {
  //           messageId: messageId
  //       }
  //     MessagesDataService.deleteMessage(data)
  //     .then((response) => {
  //       console.log(response)
  //       if (response.data.response.deletedCount === 1) {
  //         setMessages((prevState) => {
  //           const newState = [...prevState]; // Create a new array using spread operator
  //           newState.splice(index, 1); // Remove the element at the specified index
  //           return newState; // Return the updated array
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const deleteMessage = (messageId, index) => {
    console.log(messageId);
    let data = {
      messageId: messageId,
      userId: user.googleId
    };

    MessagesDataService.deleteMessage(data)
      .then((response) => {
        console.log(response)
        setMessages((prevState) => {
          prevState.splice(index, 1);
          return (
              [...prevState]
            )
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: "calc(100vh - 50px)" }}
    >
      <GroupChats
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />

      <Box
        sx={{
          backgroundColor: "#fff",
          height: "calc(100vh - 75px)",
          width: "calc(100vw - 20%)",
          minWidth: "calc(100vw - 200)",
        }}
      >
        <Conversation
          user={user}
          selectedGroup={selectedGroup}
          messages={messages}
          setNewMessage={setNewMessage}
          deleteMessage={deleteMessage}
        />
      </Box>
    </Stack>
  );
};

export default GeneralApp;
