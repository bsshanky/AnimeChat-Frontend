import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack } from '@mui/material';
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const RootPage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;

      if (now < loginExp) {
         // Not expired
        setUser(loginData) ;
      } else {
        // Expired
        localStorage.setItem("login", null);
      }

    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Box p={2} sx={{backgroundColor: 'rgb(255, 108, 0)', boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: 50, }}>
        
        <Stack direction="row" alignItems="center" sx={{height: "100%"}} justifyContent="space-between">
          
          <h4 style={{fontFamily: 'Lilita One', fontSize: '2rem', color: 'white'}}>AnimeChat</h4>

          {
              user ? (
                <Logout setUser={setUser} clientId={clientId}/>
              ) : (
                <Login setUser={setUser} />
              )
            }
        </Stack>
        
      </Box>
      <Outlet context={[user]} />
    </GoogleOAuthProvider>
  );
};

export default RootPage;