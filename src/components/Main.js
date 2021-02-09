import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'
import Goal from './Goal'


export default function Main(props) {

    const [goals, setGoals] = useState([])
    const [completedGoalId, setCompletedGoalId] = useState()

    const getCompletedGoalId = id => setCompletedGoalId(id)

    useEffect(() => {
        fetchGoals()
    }, [])

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
        fetch(`http://localhost:3001/goals`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(goals => {
            let goalsNotComplete = []
            goals.forEach(goal => {
                if (!goal.completed) {
                    goalsNotComplete.push(goal)
                }
            })
            setGoals(goalsNotComplete)
        })
    }

    let renderGoals = () => {
        if (goals.length > 0) {
            return goals.map(goal => {
                return <Goal handleNewTaskId={props.handleNewTaskId} due_date={goal.due_date} getCompletedGoalId={getCompletedGoalId} handleCompleteModalShow={props.handleCompleteModalShow} completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} handleTaskModalShow={props.handleTaskModalShow}  rgb={goal.rgb} id={goal.id} handleGoalClick={props.handleGoalClick} date={goal.date} name={goal.name} key={goal.id} />
            })
        }
    }

    return (
        <Container fluid className="main">

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
