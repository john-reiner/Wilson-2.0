import React, { useState, useEffect } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/Main/Main'

import PreAuth from './components/PreAuth/PreAuth';

export default function App() {

  const [appComponent, setAppComponent] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInStatusChange, setLoggedInStatusChange] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

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
      <div>
        {/* {renderView(appComponent, componentViews)} */}
        {loggedIn ? <Main logout={logout} userInfo={userInfo} userId={userId} /> : <PreAuth setLoggedInStatusChange={setLoggedInStatusChange}/>}
      </div>
  );
}