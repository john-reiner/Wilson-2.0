import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Jumbotron, Button, ListGroup} from 'react-bootstrap'


import Task from './Task'
import Goal from './Goal'
import TaskCompleted from './TaskCompleted'

export default function GoalShowPage(props) {

    const [goal, setGoal] = useState('')

    // const renderTasks = () => {
    //     if (goal) {
    //         if (goal.completed) {
    //             return goal.tasks.map(task => {
    //                 return <TaskCompleted rgb={goal.rgb} id={task.id} name={task.name} description={task.description} key={task.id}/>
    //             })
    //         } else {
    //             return goal.tasks.map(task => {
    //                 return <Task rgb={goal.rgb} id={task.id} completeTask={props.completeTask} name={task.name} description={task.description} key={task.id}/>
    //             })
    //         }
    //     }
    // }

    useEffect(() => {
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
    }, [])

    console.log(goal)

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
                        {goal ? <Goal handleClickedGoalId={props.handleClickedGoalId} id={goal.id} tasks={goal.tasks} rgb={goal.rgb} name={goal.name} handleTaskModalShow={props.handleTaskModalShow} /> : null}
                    </ListGroup>
                </Col>

            </Row>
        </Container>
    )    
}