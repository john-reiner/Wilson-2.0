import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import NavBar from './NavBar'
import Main from './components/Main/Main'
import Login from './components/Login'
import Landing from './components/Landing/Landing';
import SignUp from './components/SignUp';


export default function App() {
  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [componentIndex, setComponentIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    if (localStorage.getItem('wilsonUserToken')) {
      fetchUser()
    }
  }, [token]);

  const logout = () => {
    setToken(null)
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
    setComponentIndex(0)
  }

  const fetchUser = () => {
    fetch('http://localhost:3001/api/v1/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
    .then(response => response.json())
    .then(response => {
      if (response.status === "ok") {
        setUser(response.user)
        setLoggedIn(true)
        setComponentIndex(3)
      } else {
        setToken(null)
        localStorage.removeItem('wilsonUserToken')
        console.error(response.error + ":", response.message)
        setLoggedIn(false)
      }
    })
    .catch((error) => console.error("error:", error));
  }

  const renderView = (index) => {
    let componentViews = [
      <Landing setComponentIndex={setComponentIndex} />,
      <SignUp setToken={setToken} />,
      <Login setToken={setToken} setComponentIndex={setComponentIndex}/>,
      <Main user={user} />
    ]
    return componentViews[index]
  }


  return (
      <div>
        <NavBar logout={logout} firstName={user.first_name} loggedIn={loggedIn} setComponentIndex={setComponentIndex}/>
        {renderView(componentIndex)}
      </div>
  );
}