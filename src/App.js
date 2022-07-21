import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MantineProvider,
  ColorSchemeProvider
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

import Main from './components/containers/Main';

export default function App() {
  
  // COLOR SCHEMES
  // sets the preferred color scheme set in a visitors media query.
  const preferredColorScheme = useColorScheme();
  // sets the color scheme in state.
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  // confirms when the app is mounted that the proper color scheme is set.
  useEffect(() => {
    setColorScheme(preferredColorScheme)
  }, [preferredColorScheme]);
  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  };

  // AUTHENTICATION
  // handles the login flag, checking if a user is fully authenticated.
  const [loggedIn, setLoggedIn] = useState(null);
  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    let token = localStorage.getItem('wilsonUserToken')
    if (token !== null ) {
      setLoggedIn(true)
    }
  }, [loggedIn]);
  // removes the token from local storage and sets the login flag to false.
  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Main 
          loggedIn={loggedIn}
          logout={logout}
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}