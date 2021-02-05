import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import MainBody from './components/MainBody'
import SignUp from './components/SignUp'
import Login from './components/Login'
import GoalShowPage from './components/GoalShowPage'
import NewGoal from './components/NewGoal'

function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logginError, setLogginError] = useState(null)

  const [loggedinUser, setLoggedinUser] = useState(null)
  const [loggedinUserId, setLoggedinUserId] = useState(null)

  const [clickedGoalid, setClickedGoalid] = useState('')
  const [completeTaskids, setCompleteTaskids] = useState([])
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [taskModalShow, setTaskModalShow] = useState(false)

  const [completedGoal, setCompletedGoal] = useState({})
  const [confirmedCompletedGoal, setConfirmedCompletedGoal] = useState({})
  const [newTaskId, setNewTaskId] = useState('')
  const [loggingIn, setloggingIn] = useState(false)

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

    // fetch("https://wilson-backend.herokuapp.com/api/v1/users")
    // .then(response => response.json())
    // .then(users => {
      
    //   let user = users.find(user => user.username === username)
    //   if (user && user.password ===  password) {
    //       setLoggedinUser(user)
    //       setLoggedinUserId(user.id)
    //       props.history.push('/today')
    //   } else {
    //       alert('Wrong Username or Password')
    //       setloggingIn(false)
    //   }
    // })
    // setloggingIn(true)
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

  useEffect(() => {
    if (completeTaskids.length > 0) {
      fetch(`https://wilson-backend.herokuapp.com/api/v1/users/${loggedinUser.id}`)
      .then(response => response.json())
      .then(user => {
        setLoggedinUser(user)
        checkUserTasks()
      })
    }
  }, [completeTaskids])

  const handleGoalClick = id => setClickedGoalid(id)

  const completeTask = id => {
    if (completeTaskids.includes(id)) {
      fetch(`https://wilson-backend.herokuapp.com/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_complete: false
        })
      })
      setCompleteTaskids(completeTaskids.filter(taskId => taskId !== id))
    } else {
      setCompleteTaskids([...completeTaskids, id])
      fetch(`https://wilson-backend.herokuapp.com/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_complete: true
        })
      })
    }
  }

  const checkUserTasks = () => {
    if (loggedinUser.goals !== undefined && completeTaskids.length !== 0) {
        loggedinUser.goals.forEach(goal => {
          let target = []
          goal.tasks.forEach(task => {
            target.push(task.id)
          })
          if (target.length !== 0 ) {
            if (target.every(v => completeTaskids.includes(v))) {
              deleteModalOpen()
              setCompletedGoal(goal)
            }
          }
        });
    }
  }

  const deleteModalOpen = () => setDeleteModalShow(true)
  const deleteModalClose = () => setDeleteModalShow(false)

  const taskModalOpen = () => setTaskModalShow(true)
  const taskModalClose = () => setTaskModalShow(false)

  const completeGoal = (id) => {
    let goal = loggedinUser.goals.find(goal => goal.id === id)
    setCompleteTaskids([...completeTaskids].filter(ids => goal.tasks.forEach(task => task.id)))
    setConfirmedCompletedGoal(goal.tasks)
    fetch(`https://wilson-backend.herokuapp.com/api/v1/goals/${id}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          is_complete: true,
          date_completed: new Date()
      })
    })
    deleteModalClose()
  }

  const getNewTaskId = (id) => setNewTaskId(id)



  return (
    <div>
      <NavBar loggedinUser={loggedinUser}/> 
      <MainBody newTaskId={newTaskId} getNewTaskId={getNewTaskId} confirmedCompletedGoal={confirmedCompletedGoal} taskModalShow={taskModalShow} taskModalClose={taskModalClose} taskModalOpen={taskModalOpen} clickedGoalid={clickedGoalid} completeGoal={completeGoal} completedGoal={completedGoal} deleteModalClose={deleteModalClose} deleteModalShow={deleteModalShow} loggedinUser={loggedinUser} handleGoalClick={handleGoalClick} completeTaskids={completeTaskids} completeTask={completeTask}/>
      <Route exact path="/signup" render={() => <SignUp />} />
      <Route exact path="/login" render={(routerProps) => <Login loggingIn={loggingIn} handleSubmit={handleSubmit} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} loggedinUser={loggedinUser} username={username} password={password} {...routerProps}/>} />
      <Route exact path="/goal_showpage" render={() => <GoalShowPage newTaskId={newTaskId} taskModalOpen={taskModalOpen} clickedGoalid={clickedGoalid} completeTaskids={completeTaskids} completeTask={completeTask} />} />
      <Route exact path="/add_goal" render={() => <NewGoal loggedinUser={loggedinUser}/>} />
    </div>
  );
} 
export default withRouter(App);