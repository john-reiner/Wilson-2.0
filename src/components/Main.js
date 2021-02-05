  
import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import Goal from './Goal'


export default function Main(props) {

    // const updateTasks = () => {
    //     fetch(`https://wilson-backend.herokuapp.com/api/v1/users/${props.loggedinUser.id}`)
    //     .then(response => response.json())
    //     .then(user => {
    //         let tasks = []
    //         user.goals.forEach(goal => {
    //             if (!goal.is_complete) {
    //                 let rgb = goal.rgb
    //                 goal.tasks.forEach(task => {
    //                     task.rgb = rgb
    //                     tasks.push(task)
    //                 })
    //             }
    //         })
    //         setTasks(tasks)
    //     })
    // }
    // const updateGoals = () => {
    //     fetch(`https://wilson-backend.herokuapp.com/api/v1/users/${props.loggedinUser.id}`)
    //     .then(response => response.json())
    //     .then(user => setGoals(user.goals.filter(goal => !goal.is_complete)))        
    // }

    // const updateResources = () => {
    //     fetch(`http://localhost:3000/api/v1/users/${props.loggedinUser.id}`)
    //     .then(response => response.json())
    //     .then(user => {
    //         let resources = []
    //         user.goals.forEach(goal => {
    //             if (goal.goal_resources.length > 0 && !goal.is_complete) {
    //                 goal.goal_resources.forEach(resource => {
    //                     resources.push(resource)
    //                 })
    //             }
    //         });
    //         setResources(resources)
    //     })
    // }

    // useEffect(() => {
    //     updateTasks()
    //     updateGoals()
    // }, [])

    // useEffect(() => {
    //     updateGoals()
    // }, [props.completeTaskids])

    // useEffect(() => {
    //     updateTasks()
    //     updateGoals()
    // }, [props.confirmedCompletedGoal])
    
    // useEffect(() => {
    //     updateTasks()
    // }, [props.newTaskId])

    // useEffect(() => {
    //     updateResources()
    // }, [props.newResourceId])

    let renderGoals = () => {
        if (props.goals.length > 0) {
            return props.goals.map(goal => {
                return <Goal completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} handleTaskModalShow={props.handleTaskModalShow}  rgb={goal.rgb} id={goal.id} handleGoalClick={props.handleGoalClick} date={goal.date} name={goal.name} key={goal.id} />
            })
        }
    }



    return (
        <Container fluid style={{backgroundColor: '#333', color: 'white', padding: '3%', minHeight: "80vh", width: "100%"}}>
                <Button variant="secondary" size="lg" style={{width: '50%'}} onClick={props.handleGoalModalShow}>
                    Add A Goal
                </Button>
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
