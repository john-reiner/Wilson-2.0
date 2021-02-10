import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import Main from './components/Main'
import SignUp from './components/SignUp'
import Login from './components/Login'
import GoalShowPage from './components/GoalShowPage'
import NewGoal from './components/NewGoal'
import Completed from './components/Completed'
import NewTask from './components/NewTask'
import ModalErrors from './components/ModalErrors'


function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  const getRemovedTaskId = id => setRemovedTaskId(id)
  
  const handleTaskModalShow = () => setTaskModalShow(true)
  const handleTaskModalClose = () => setTaskModalShow(false)
  
  const handleGoalModalShow = () => setGoalModalShow(true)
  const handleGoalModalClose = () => setGoalModalShow(false)
  
  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleClickedGoalId = id => setClickedGoalid(id)
  const handleNewTaskId = id => setNewTaskId(id)
  const handleNewGoalId = id => setNewGoalId(id)

  const handleErrorClose = () => setErrorModalShow(false);
  const handleErrorShow = () => setErrorModalShow(true);
  
  const logoutUser = () => {
    localStorage.setItem('wilsonUserToken', '')
    props.history.push('/login')
  }


  useEffect(() => {
    let storage = localStorage.getItem('wilsonUserToken')
    if (storage.length > 0) {
      props.history.push('/')
    } else {
      props.history.push('/login')
    }
  }, [props.history])

  const handleSubmit = e => {
    e.preventDefault()
    loginUser()
  }

  const verifyToken = token => {
    if (token.token) {
      localStorage.setItem('wilsonUserToken', token.token)
      setLoggedinUserId(token.id)
      setLogginError('')
      props.history.push('/')
    } else {
      localStorage.setItem('wilsonUserToken', '')
      setLogginError(token.message)
      handleErrorShow()
    }
  }

  const loginUser = () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then(response => response.json())
    .then(token => {
      verifyToken(token)
    })
    .catch((error) => setLogginError(error));
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    fetch(`http://localhost:3001/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
    .then(response => response.json())
    .then(user => setLoggedinUser(user.username))
  }, [loggedinUserId])

  const completeTask = id => {
    fetch(`http://localhost:3001/complete-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
  }


  return (
    <div>
          <NavBar handleGoalModalShow={handleGoalModalShow} logoutUser={logoutUser} loggedinUser={loggedinUser}/>
          <Route exact path="/login" render={(routerProps) => <Login handleSubmit={handleSubmit} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} loggedinUser={loggedinUser} {...routerProps}/>} />
          <Route exact path="/signup" render={() => <SignUp />} />

          <ModalErrors show={errorModalShow} handleErrorClose={handleErrorClose} errors={logginError} />
          <NewTask handleNewTaskId={handleNewTaskId} show={taskModalShow} onHide={handleTaskModalClose} goalId={props.id} clickedGoalid={clickedGoalid} />
          <NewGoal handleNewGoalId={handleNewGoalId} onHide={handleGoalModalClose} show={goalModalShow} loggedinUser={loggedinUser}/>
          <Route exact path="/" render={() => <Main removedTaskId={removedTaskId} getRemovedTaskId={getRemovedTaskId} handleNewTaskId={handleNewTaskId} newGoalId={newGoalId} newTaskId={newTaskId} completeTask={completeTask} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} handleGoalModalShow={handleGoalModalShow} />} />
          <Route exact path="/goal-showpage" render={() => <GoalShowPage completeTask={completeTask} newTaskId={newTaskId} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} clickedGoalid={clickedGoalid} />} />
          <Route exact path="/completed" render={() => <Completed handleClickedGoalId={handleClickedGoalId} loggedinUser={props.loggedinUser} handleGoalClick={props.handleGoalClick}/>} />     
    </div>
  );
} 
export default withRouter(App);