import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Jumbotron, Button, ListGroup} from 'react-bootstrap'

import Goal from './Goal'


export default function GoalShowPage(props) {

    const [goal, setGoal] = useState('')

    useEffect(() => {
        renderGoal()
    }, [props.newTaskId])

    const renderGoal = () => {
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
                        {goal ? <Goal completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} id={goal.id} tasks={goal.tasks} rgb={goal.rgb} name={goal.name} handleTaskModalShow={props.handleTaskModalShow} /> : null}
                    </ListGroup>
                </Col>

            </Row>
        </Container>
    )    
}