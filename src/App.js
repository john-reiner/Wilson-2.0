import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import NavBar from './NavBar'
import Main from './components/Main/Main'
import Login from './components/Login'
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp';


export default function App() {

  const [token, setToken] = useState(null);
  // const [user, setUser] = useState({});
  const [appComponent, setAppComponent] = useState('landing');
  const [loggedIn, setLoggedIn] = useState(false);

  const [{requestedData: user, errors, loading}, goFetch] = useFetch(null)

  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    if (localStorage.getItem('wilsonUserToken')) {
      fetchUser()
      setAppComponent('main')
      setLoggedIn(true)
    }
  }, [token]);

  const logout = () => {
    setToken(null)
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
    setAppComponent(0)
  }

  const fetchUser = () => {
    goFetch('http://localhost:3001/api/v2/users/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
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