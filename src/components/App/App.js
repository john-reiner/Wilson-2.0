import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch'
import './App.css';

import NavBar from '../NavBar/NavBar'
import Main from '../Main/Main'
import Login from '../Login/Login'
import Landing from '../Landing/Landing';
import SignUp from '../SignUp/SignUp';


export default function App() {

  const [token, setToken] = useState(null);
  const [appComponent, setAppComponent] = useState('landing');
  const [loggedIn, setLoggedIn] = useState(false);

  const [{requestedData: user}, goFetch] = useFetch(null)
  
  const fetchUser = () => {
    goFetch('http://localhost:3001/api/v2/users/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
  }
  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    if (localStorage.getItem('wilsonUserToken')) {
      fetchUser()
      setAppComponent('main')
      setLoggedIn(true)
    }
  }, [token, fetchUser]);

  const logout = () => {
    setToken(null)
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
    setAppComponent(0)
  }



  const renderView = (componentViewName, componentViews) => {
    if (componentViewName) {
      let combo = componentViews.find(combo => combo[1] === componentViewName)
      return combo[0]
    }
  }
  
  let componentViews = [
    [<Landing setAppComponent={setAppComponent} />, "landing"],
    [<SignUp setToken={setToken} />, "signup"],
    [<Login setToken={setToken} setAppComponent={setAppComponent}/>, "login"],
    [<Main user={user} />, "main"]
  ]

  return (
      <div>
        <NavBar logout={logout} firstName={user.first_name} loggedIn={loggedIn} setAppComponent={setAppComponent}/>
        {renderView(appComponent, componentViews)}
      </div>
  );
}