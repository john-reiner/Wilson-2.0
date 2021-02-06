import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Jumbotron, Button} from 'react-bootstrap'

import Task from './Task'
import TaskCompleted from './TaskCompleted'

export default function GoalShowPage(props) {

    const [goal, setGoal] = useState('')

    const renderTasks = () => {
        if (goal) {
            if (goal.completed) {
                return goal.tasks.map(task => {
                    return <TaskCompleted rgb={goal.rgb} id={task.id} completeTask={props.completeTask} completeTaskids={props.completeTaskids} name={task.name} description={task.description} key={task.id}/>
                })
            } else {
                return goal.tasks.map(task => {
                    return <Task rgb={goal.rgb} id={task.id} completeTask={props.completeTask} completeTaskids={props.completeTaskids} name={task.name} description={task.description} key={task.id}/>
                })
            }
        }
    }

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

    return (
        <Container fluid style={{backgroundColor: '#333', padding: '50px'}}>
            <Row>
                <Col>
                    <Jumbotron style={{ border: `solid ${goal.rgb} 4px`}}>
                        <h1>{goal.name}</h1>
                        <p>{goal.description}</p>
                        <p>
                            <Button variant="secondary" onClick={props.handleTaskModalShow}>Add Task</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col>
                    {renderTasks()}
                </Col>

            </Row>
        </Container>
    )    
}