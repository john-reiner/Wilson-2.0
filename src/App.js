import React, { useState, useEffect } from 'react';
// import './App.css';
import { MantineProvider, Paper, ActionIcon } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
import Main from './components/Main/Main'
// @ts-ignore
import PreAuth from './components/PreAuth/PreAuth';

export default function App() {

  const [appComponent, setAppComponent] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInStatusChange, setLoggedInStatusChange] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkmode = () => setDarkMode(!darkMode)

  console.log(darkMode)

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
      console.log(data)
      if (data.status === "ok") {
        setUserId(data.user.id)
        setUserInfo(data.user)
        setLoggedIn(true)
        setAppComponent('main')
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
      setAppComponent('main')
    }
  }, [loggedInStatusChange]);

  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
  }

  // const renderView = (componentViewName, componentViews) => {
  //   if (componentViewName) {
  //     let combo = componentViews.find(combo => combo[1] === componentViewName)
  //     return combo[0]
  //   }
  // }
  
  // let componentViews = [
  //   [<SignUp setLoggedInStatusChange={setLoggedInStatusChange} />, "signup"],
  //   [<Login setLoggedInStatusChange={setLoggedInStatusChange} setAppComponent={setAppComponent}/>, "login"],
  //   [<PreAuth />, "preauth"],
  //   [<Main userId={userId} />, "main"]
  // ]

  return (
        <MantineProvider theme={{ colorScheme: darkMode ? 'dark' : 'light'}} withGlobalStyles withNormalizeCSS>
          <Paper radius={0} style={{minHeight: "100vh"}}>
          <ActionIcon
            variant="outline"
            color={!darkMode ? 'yellow' : 'blue'}
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle color scheme"
          >
            {!darkMode ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
          {loggedIn ? <Main logout={logout} userInfo={userInfo} userId={userId} /> : <PreAuth setLoggedInStatusChange={setLoggedInStatusChange}/>}
          </Paper>
          {/* {renderView(appComponent, componentViews)} */}
        </MantineProvider>
  );
}