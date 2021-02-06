import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import Main from './components/Main'
import SignUp from './components/SignUp'
import Login from './components/Login'
import GoalShowPage from './components/GoalShowPage'
import NewGoal from './components/NewGoal'
import AllGoals from './components/AllGoals'
import NewTask from './components/NewTask'
import DeleteGoal from './components/DeleteGoal'

function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logginError, setLogginError] = useState(null)

  const [loggedinUser, setLoggedinUser] = useState(null)
  const [loggedinUserId, setLoggedinUserId] = useState(null)

  const [clickedGoalid, setClickedGoalid] = useState('')
  // const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [goalModalShow, setGoalModalShow] = useState(false)
  

  const [completedGoal, setCompletedGoal] = useState({})
  const [confirmedCompletedGoal, setConfirmedCompletedGoal] = useState({})
  const [loggingIn, setloggingIn] = useState(false)
  const [goals, setGoals] = useState([])
  const [taskModalShow, setTaskModalShow] = useState(false)
  const [newTaskId, setNewTaskId] = useState('')
  const [newGoalId, setNewGoalId] = useState('')
  const [completedTaskId, setCompletedTaskId] = useState([])

  const handleTaskModalShow = () => setTaskModalShow(true)
  const handleTaskModalClose = () => setTaskModalShow(false)

  const handleGoalModalShow = () => setGoalModalShow(true)
  const handleGoalModalClose = () => setGoalModalShow(false)

  const fetchGoals = () => {
    fetch(`http://localhost:3001/goals`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
        }
    })
    .then(response => response.json())
    .then(goals => {
        setGoals(goals)
    })
  }

  useEffect(() => {
    fetchGoals()
  }, [newTaskId])

  useEffect(() => {
    fetchGoals()
  }, [newGoalId])


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

  // useEffect(() => {
  //   if (completeTaskids.length > 0) {
  //     fetch(`https://wilson-backend.herokuapp.com/api/v1/users/${loggedinUser.id}`)
  //     .then(response => response.json())
  //     .then(user => {
  //       setLoggedinUser(user)
  //       checkUserTasks()
  //     })
  //   }
  // }, [completeTaskids])

  const completeTask = id => {
    fetch(`http://localhost:3001/complete-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
      }
    })
  }

  // useEffect(() => {
  //   console.log('fetch that goal')
  //   fetchGoals()
  // }, [completedTaskId])

  // const completeTask = id => {
  //   if (completeTaskids.includes(id)) {
  //     fetch(`https://wilson-backend.herokuapp.com/api/v1/tasks/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         is_complete: false
  //       })
  //     })
  //     setCompleteTaskids(completeTaskids.filter(taskId => taskId !== id))
  //   } else {
  //     setCompleteTaskids([...completeTaskids, id])
  //     fetch(`https://wilson-backend.herokuapp.com/api/v1/tasks/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         is_complete: true
  //       })
  //     })
  //   }
  // }

  // const checkUserTasks = () => {
  //   if (loggedinUser.goals !== undefined && completeTaskids.length !== 0) {
  //       loggedinUser.goals.forEach(goal => {
  //         let target = []
  //         goal.tasks.forEach(task => {
  //           target.push(task.id)
  //         })
  //         if (target.length !== 0 ) {
  //           if (target.every(v => completeTaskids.includes(v))) {
  //             deleteModalOpen()
  //             setCompletedGoal(goal)
  //           }
  //         }
  //       });
  //   }
  // }

  // const deleteModalOpen = () => setDeleteModalShow(true)
  // const deleteModalClose = () => setDeleteModalShow(false)



  // const completeGoal = (id) => {
  //   let goal = loggedinUser.goals.find(goal => goal.id === id)
  //   setCompleteTaskids([...completeTaskids].filter(ids => goal.tasks.forEach(task => task.id)))
  //   setConfirmedCompletedGoal(goal.tasks)
  //   fetch(`https://wilson-backend.herokuapp.com/api/v1/goals/${id}`, {
  //     method: "PUT",
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         is_complete: true,
  //         date_completed: new Date()
  //     })
  //   })
  //   deleteModalClose()
  // }

  const getNewTaskId = (id) => setNewTaskId(id)
  const handleClickedGoalId = id => setClickedGoalid(id)
  const handleNewTaskId = id => setNewTaskId(id)
  const handleNewGoalId = id => setNewGoalId(id)


  return (
    <div>
      
      <NavBar loggedinUser={loggedinUser}/>
      <Route exact path="/" render={() => <Main completeTask={completeTask} handleGoalModalShow={handleGoalModalShow} handleClickedGoalId={handleClickedGoalId} handleTaskModalShow={handleTaskModalShow} goals={goals} />} />
      <NewTask handleNewTaskId={handleNewTaskId} show={taskModalShow} onHide={handleTaskModalClose} goalId={props.id} clickedGoalid={clickedGoalid} />
      <Route exact path="/goal_showpage" render={() => <GoalShowPage />} />
      <DeleteGoal completeGoal={props.completeGoal} completedGoal={props.completedGoal} show={props.deleteModalShow} onHide={props.deleteModalClose}  />
      <Route exact path="/goals" render={() => <AllGoals resourceModalOpen={props.resourceModalOpen}  loggedinUser={props.loggedinUser} handleGoalClick={props.handleGoalClick}/>} />     
      <Route exact path="/signup" render={() => <SignUp />} />
      <Route exact path="/login" render={(routerProps) => <Login loggingIn={loggingIn} handleSubmit={handleSubmit} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} loggedinUser={loggedinUser} username={username} password={password} {...routerProps}/>} />
      <NewGoal handleNewGoalId={handleNewGoalId} onHide={handleGoalModalClose} show={goalModalShow} loggedinUser={loggedinUser}/>
    </div>
  );
} 
export default withRouter(App);