import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import {Container, Row, Col, Jumbotron, Button, ListGroup} from 'react-bootstrap'

import Goal from './Goal'
import GoalCompleted from './GoalCompleted'


function GoalShowPage(props) {

    const [goal, setGoal] = useState('')

    const [completedGoalId, setCompletedGoalId] = useState('')

    const getCompletedGoalId = id => setCompletedGoalId(id)

    useEffect(() => {
        if (completedGoalId !== '') {
            props.history.push('/')
        }
    }, [completedGoalId])

    useEffect(() => {
        fetchGoal()
    }, [props.newTaskId])

    const fetchGoal = () => {
        fetch(`http://localhost:3001/goals/${props.clickedGoalid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(goal => {
            setGoal(goal)
        })
    }

    const renderGoal = () => {
        if (goal.completed) {
            return <GoalCompleted key={goal.id} completedDate={goal.completed_date} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} name={goal.name} id={goal.id} rgb={goal.rgb} />
        } else {
            return <Goal getCompletedGoalId={getCompletedGoalId} completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} id={goal.id} tasks={goal.tasks} rgb={goal.rgb} name={goal.name} handleTaskModalShow={props.handleTaskModalShow} />
        }
    }

    return (
        <Container fluid style={{backgroundColor: '#333', padding: '50px'}}>
            <Row>
                <Col>
                    <Jumbotron style={{ border: `solid ${goal.rgb} 4px`}}>
                        <h1>{goal.name}</h1>
                        <p>{goal.description}</p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {goal ? renderGoal() : null}
                    </ListGroup>
                </Col>

            </Row>
        </Container>
    )    
}
export default withRouter(GoalShowPage)