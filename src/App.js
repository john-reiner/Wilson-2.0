import React, { useState, useEffect } from 'react';
import './App.css';
import { MantineProvider, Paper} from '@mantine/core';

import Wilson from './components/Wilson/Wilson'
import PreAuth from './components/PreAuth/containers/PreAuth';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleDarkmode = () => setDarkMode(!darkMode)
  
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
        <Wilson
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleDarkmode={toggleDarkmode}
          logout={logout}
        />
      )
    }
    return (
      <PreAuth 
        setLoggedIn={setLoggedIn}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleDarkmode={toggleDarkmode}
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