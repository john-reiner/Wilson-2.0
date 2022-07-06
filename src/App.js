import React, { useState, useEffect } from 'react';
import './App.css';
import { MantineProvider, Paper} from '@mantine/core';

import Main from './components/Main/Main'
import PreAuth from './components/PreAuth/PreAuth';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  const [darkMode, setDarkMode] = useState(true);
  
  const toggleDarkmode = () => setDarkMode(!darkMode)

  // const verifyToken = () => {
  //   fetch('http://localhost:3001/api/v2/user', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
  //       }
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     if (data.status === "ok") {
  //       setLoggedIn(true)
  //     } else {
  //       alert("something went wrong...")
  //       setLoggedIn(false)
  //     }
  //   });
  // }
  
  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    let token = localStorage.getItem('wilsonUserToken')
    if (token !== null ) {
      setLoggedIn(true)
    }
  }, [loggedIn]);

  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
  }

  const renderMain = () => {
    if (loggedIn) {
      return (
        <Main
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleDarkmode={toggleDarkmode}
          logout={logout}
          // userId={userId}

        />
      )
    }
    return (
      <PreAuth 
        setLoggedIn={setLoggedIn}
      />
    )

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
          {renderMain()}
          </Paper>
        </MantineProvider>
  );
}