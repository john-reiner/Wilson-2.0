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


function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logginError, setLogginError] = useState(null)

  const [loggedinUser, setLoggedinUser] = useState(null)
  const [loggedinUserId, setLoggedinUserId] = useState(null)

  const [clickedGoalid, setClickedGoalid] = useState('')
  const [goalModalShow, setGoalModalShow] = useState(false)
  


  const [loggingIn, setloggingIn] = useState(false)
  const [taskModalShow, setTaskModalShow] = useState(false)
  const [newTaskId, setNewTaskId] = useState('')
  const [newGoalId, setNewGoalId] = useState('')







  const handleTaskModalShow = () => setTaskModalShow(true)
  const handleTaskModalClose = () => setTaskModalShow(false)

  const handleGoalModalShow = () => setGoalModalShow(true)
  const handleGoalModalClose = () => setGoalModalShow(false)

  useEffect(() => {
    if (localStorage.getItem('wilsonUserToken').length > 1) {
      props.history.push('/')
    } else {
      props.history.push('/login')
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    loginUser() 
  }

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const loginUser = () => {

    fetch('http://localhost:3001/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then(response => response.json())
    .then(token => {
      if (token.token) {
        localStorage.setItem('wilsonUserToken', token.token)
        setLoggedinUserId(token.id)
        setLogginError(null)
        props.history.push('/')
      } else {
        localStorage['wilsonUserToken'] = ''
        setLogginError(token.message)
      }
    })
    .catch((error) => setLogginError(error));
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

  const getNewTaskId = (id) => setNewTaskId(id)
  const handleClickedGoalId = id => setClickedGoalid(id)
  const handleNewTaskId = id => setNewTaskId(id)
  const handleNewGoalId = id => setNewGoalId(id)


  return (
    <div>
      <NavBar loggedinUser={loggedinUser}/>
      <Route exact path="/" render={() => <Main newGoalId={newGoalId} newTaskId={newTaskId} completeTask={completeTask} handleGoalModalShow={handleGoalModalShow} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} />} />
      <NewTask handleNewTaskId={handleNewTaskId} show={taskModalShow} onHide={handleTaskModalClose} goalId={props.id} clickedGoalid={clickedGoalid} />
      <Route exact path="/goal-showpage" render={() => <GoalShowPage completeTask={completeTask} newTaskId={newTaskId} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} clickedGoalid={clickedGoalid} />} />
      
      <Route exact path="/completed" render={() => <Completed handleClickedGoalId={handleClickedGoalId} loggedinUser={props.loggedinUser} handleGoalClick={props.handleGoalClick}/>} />     
      <Route exact path="/signup" render={() => <SignUp />} />
      <Route exact path="/login" render={(routerProps) => <Login loggingIn={loggingIn} handleSubmit={handleSubmit} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} loggedinUser={loggedinUser} username={username} password={password} {...routerProps}/>} />
      <NewGoal handleNewGoalId={handleNewGoalId} onHide={handleGoalModalClose} show={goalModalShow} loggedinUser={loggedinUser}/>
    </div>
  );
} 
export default withRouter(App);