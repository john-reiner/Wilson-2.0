import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Main from './components/Main'
import SignUp from './components/SignUp'
import Login from './components/Login'
import GoalShowPage from './components/GoalShowPage'
import NewGoal from './components/NewGoal'
import Completed from './components/Completed'
import NewTask from './components/NewTask'
import ModalErrors from './components/ModalErrors'


export default function App() {
  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [componentIndex, setComponentIndex] = useState(0);

  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    if (localStorage.getItem('wilsonUserToken')) {
      fetchUser()
    }
  }, [token]);

  const fetchUser = () => {
    fetch('http://localhost:3001/api/v1/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
    .then(response => response.json())
    .then(user => {
      setUser(user)
      setComponentIndex(1)
    })
    .catch((error) => setLogginError(error));
  }


  console.log(user)





  const [logginError, setLogginError] = useState(null)
  const [loggedinUser, setLoggedinUser] = useState(null)
  const [loggedinUserId, setLoggedinUserId] = useState(null)
  const [clickedGoalid, setClickedGoalid] = useState('')
  const [goalModalShow, setGoalModalShow] = useState(false)
  const [taskModalShow, setTaskModalShow] = useState(false)
  const [errorModalShow, setErrorModalShow] = useState(false)
  const [newTaskId, setNewTaskId] = useState('')
  const [newGoalId, setNewGoalId] = useState('')
  const [removedTaskId, setRemovedTaskId] = useState(0)
  const [loggingIn, setLoggingIn] = useState(false)


  const getRemovedTaskId = id => setRemovedTaskId(id)
  
  const handleTaskModalShow = () => setTaskModalShow(true)
  const handleTaskModalClose = () => setTaskModalShow(false)
  
  const handleGoalModalShow = () => setGoalModalShow(true)
  const handleGoalModalClose = () => setGoalModalShow(false)
  
  // const handleUsernameChange = e => setUsername(e.target.value)
  // const handlePasswordChange = e => setPassword(e.target.value)
  const handleClickedGoalId = id => setClickedGoalid(id)
  const handleNewTaskId = id => setNewTaskId(id)
  const handleNewGoalId = id => setNewGoalId(id)

  const handleErrorClose = () => setErrorModalShow(false);
  const handleErrorShow = () => setErrorModalShow(true);
  


  const logoutUser = () => {
    setLoggedinUser(null)
    localStorage.removeItem('wilsonUserToken')
    // props.history.push('/login')
  }

  // const loginUser = (username, password) => {
  //   fetch('https://wilson-rails.herokuapp.com/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({username, password}),
  //   })
  //   .then(response => response.json())
  //   .then(token => {
  //     verifyToken(token)
  //   })
  //   .catch((error) => setLogginError(error));
  //   setLoggingIn(true)
  // }

  // useEffect(() => {
    
  //   fetch(`https://wilson-rails.herokuapp.com/api/v1/user`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(user => {
  //     setLoggedinUser(user.username)
  //     console.log(user)
  //   })
  //   .catch(errors => console.log(errors, localStorage.getItem('wilsonUserToken')))
  // }, [loggedinUserId])

  const completeTask = id => {
    fetch(`https://wilson-rails.herokuapp.com/api/v1/complete-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
  }

  const renderView = (index) => {
    let componentViews = [
      <Login setToken={setToken} setLoggedinUserId={setLoggedinUserId} loggingIn={loggingIn} loggedinUser={loggedinUser} />,
      // <ModalErrors show={errorModalShow} handleErrorClose={handleErrorClose} errors={logginError} />,
      // <NewTask handleNewTaskId={handleNewTaskId} show={taskModalShow} onHide={handleTaskModalClose} goalId={props.id} clickedGoalid={clickedGoalid} />,
      // <NewGoal handleNewGoalId={handleNewGoalId} onHide={handleGoalModalClose} show={goalModalShow} loggedinUser={loggedinUser}/>,
      // <GoalShowPage completeTask={completeTask} newTaskId={newTaskId} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} clickedGoalid={clickedGoalid} />,
      // <Completed handleClickedGoalId={handleClickedGoalId} loggedinUser={props.loggedinUser} handleGoalClick={props.handleGoalClick}/>,
      <Main removedTaskId={removedTaskId} getRemovedTaskId={getRemovedTaskId} handleNewTaskId={handleNewTaskId} newGoalId={newGoalId} newTaskId={newTaskId} completeTask={completeTask} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} handleGoalModalShow={handleGoalModalShow} />
    ]
    return componentViews[index]
  }


  return (
    <div>
      <NavBar handleGoalModalShow={handleGoalModalShow} logoutUser={logoutUser} loggedinUser={loggedinUser}/>
      {renderView(componentIndex)}
    </div>
  );
}