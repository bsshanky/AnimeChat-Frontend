
//import React, { useState } from "react";
import { Box, Typography, Stack } from '@mui/material';
import GroupElement from './GroupElement';
import { AnimeGroups } from '../data/logoImages';

const GroupChats = ({selectedGroup, setSelectedGroup}) => {
    
    const handleGroupSelect = (groupId) => {
        setSelectedGroup(groupId);
        localStorage.setItem('selectedGroup', groupId); // Store selected group in local storage
      };

    return (
        <Box 
            position="relative" 
            sx={{
                backgroundColor: "#F8FAFF", 
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", 
                overflowY: "auto",
                height: "100vh",
                width: "20%",
                minWidth: 200
            }}
        >
        
            <Stack p={2} spacing={3} sx={{height: "100vh"}}>

                <Typography variant='h5' fontWeight='bold'>Groups</Typography>
                

                <Stack p={1} spacing={3} direction="column" sx={{flexGrow: 1, overflow: "scroll", height: "100%"}}>
                    {AnimeGroups.map((group, index) => (
                        <GroupElement
                            key={index}
                            logo={group.source}
                            selected={group.groupId === selectedGroup}
                            onClick={() => handleGroupSelect(group.groupId)}
                        />
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default GroupChats;

