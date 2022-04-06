import React, {useState, useEffect} from 'react'
import {Container, Row, Col, ListGroup, Button, Spinner} from 'react-bootstrap'
import Goal from './Goal'


export default function Main(props) {

    const [goals, setGoals] = useState([])
    const [completedGoalId, setCompletedGoalId] = useState()
    const [loading, setLoading] = useState(false)


    const getCompletedGoalId = id => setCompletedGoalId(id)
    useEffect(() => {
        fetchGoals()
    }, [])

    useEffect(() => {
        fetchGoals()
    }, [props.removedTaskId])

    useEffect(() => {
        fetchGoals()
    }, [props.newTaskId])

    useEffect(() => {
        fetchGoals()
    }, [props.newGoalId])
    

    useEffect(() => {
        fetchGoals()
    }, [completedGoalId])

    const fetchGoals = () => {

        fetch(`https://wilson-rails.herokuapp.com/api/v1/goals`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(goals => {
            if (goals.error) {
                props.history.push('/login')
                setLoading(false)
            } else {
                let goalsNotComplete = []
                goals.forEach(goal => {
                    if (!goal.completed) {
                        goalsNotComplete.push(goal)
                    }
                })
                setLoading(false)
                setGoals(goalsNotComplete)
            }
        })
        .catch(errors => console.log(errors))
        setLoading(true)
    }

    let renderGoals = () => {
        if (goals.length > 0) {
            return goals.map(goal => {
                return <Goal getRemovedTaskId={props.getRemovedTaskId} description={goal.description} handleNewTaskId={props.handleNewTaskId} due_date={goal.due_date} getCompletedGoalId={getCompletedGoalId} handleCompleteModalShow={props.handleCompleteModalShow} completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} handleTaskModalShow={props.handleTaskModalShow}  rgb={goal.rgb} id={goal.id} handleGoalClick={props.handleGoalClick} date={goal.date} name={goal.name} key={goal.id} />
            })
        }
    }

    const renderMainTitle = () => {
        if (loading) {
            return (
                <Col id='main-title-container'>
                    <h1>Loading <Spinner animation="border" variant="secondary" /> Please wait... fetching from Heroku</h1>
                </Col>    
            )
        } else {
            
            if (goals.length === 0) {
                return (
                    <Col id='main-title-container'>
                        <h1>Click </h1>
                            <Button variant="secondary" id='main-title-button' onClick={props.handleGoalModalShow}>New Goal</Button>
                        <h1>to create a Goal!</h1>                   
                    </Col>
                )
            } else {
                return (
                <Col id='main-title-container'>
                    <h1>{goals.length === 1 ? goals.length + ' Goal Remaining!' : goals.length + ' Goals Remaining'}</h1>
                </Col>                
                )
    
            }
        }
    }

    return (
        <Container fluid className="main">
            
                {renderMainTitle()}
            
            <Row>
            <Col>
                <hr style={{borderTop: "3px solid white"}}/>
                <ListGroup>
                    {renderGoals()}
                </ListGroup>
            </Col>
                
            </Row>
        </Container>
    )
}