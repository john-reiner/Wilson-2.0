import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../NavBar/NavBar'
import Main from '../Main/Main'
import Login from '../Login/Login'
import Landing from '../Landing/Landing';
import SignUp from '../SignUp/SignUp';

export default function App() {

  const [appComponent, setAppComponent] = useState('landing');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInStatusChange, setLoggedInStatusChange] = useState(true);

  const [{requestedData: user}, goFetch] = useFetch(null)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (localStorage.wilsonUserToken !== undefined && !loggedIn) {
      console.log("Fetching User...")
      fetchUser()
      setLoggedIn(true)
      setLoggedInStatusChange(false)
      setAppComponent('main')
    }
  }, [fetchUser, loggedIn, loggedInStatusChange]);

  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
    setAppComponent('login')
  }



  const renderView = (componentViewName, componentViews) => {
    if (componentViewName) {
      let combo = componentViews.find(combo => combo[1] === componentViewName)
      return combo[0]
    }
  }
  
  let componentViews = [
    [<Landing setAppComponent={setAppComponent} />, "landing"],
    [<SignUp />, "signup"],
    [<Login setLoggedInStatusChange={setLoggedInStatusChange} setAppComponent={setAppComponent}/>, "login"],
    [<Main user={user} />, "main"]
  ]

  return (
      <div>
        <NavBar loggedIn={loggedIn} logout={logout} firstName={user.first_name} setAppComponent={setAppComponent}/>
        {renderView(appComponent, componentViews)}
      </div>
  );
}