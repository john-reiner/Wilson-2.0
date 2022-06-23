import React, { useState, useEffect } from 'react';
import './App.css';
import { MantineProvider, Paper} from '@mantine/core';
import 'bootstrap/dist/css/bootstrap.min.css';


import Main from './components/Main/Main'

import PreAuth from './components/PreAuth/PreAuth';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInStatusChange, setLoggedInStatusChange] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [darkMode, setDarkMode] = useState(true);
  
  const toggleDarkmode = () => setDarkMode(!darkMode)

  const fetchUser = () => {
    fetch('http://localhost:3001/api/v2/users/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
        }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "ok") {
        setUserId(data.user.id)
        setUserInfo(data.user)
        setLoggedIn(true)
      } else {
        alert("something went wrong...")
      }
    });
  }
  
  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    var wilsonToken = localStorage.getItem("wilsonUserToken")
    if (wilsonToken) {
      fetchUser()
      setLoggedInStatusChange(false)
    }
  }, [loggedInStatusChange]);

  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
  }

  return (
        <MantineProvider 
          theme={{ colorScheme: darkMode ? 'dark' : 'light'}} 
          withGlobalStyles withNormalizeCSS
        >
          <Paper 
            radius={0} 
            style={{minHeight: "100vh"}}
          >
          {loggedIn ? 
                      <Main 
                        darkMode={darkMode} 
                        setDarkMode={setDarkMode} 
                        toggleDarkmode={toggleDarkmode} 
                        logout={logout} userInfo={userInfo} 
                        userId={userId} 

                        /> 
                    : 
                      <PreAuth 
                        setLoggedInStatusChange={setLoggedInStatusChange}
                      />
          }
          </Paper>
        </MantineProvider>
  );
}