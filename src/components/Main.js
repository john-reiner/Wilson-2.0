  
import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import Goal from './Goal'


export default function Main(props) {

    let renderGoals = () => {
        if (props.goals.length > 0) {
            return props.goals.map(goal => {
                return <Goal getCompletedGoalId={props.getCompletedGoalId} handleCompleteModalShow={props.handleCompleteModalShow} completeTask={props.completeTask} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} handleTaskModalShow={props.handleTaskModalShow}  rgb={goal.rgb} id={goal.id} handleGoalClick={props.handleGoalClick} date={goal.date} name={goal.name} key={goal.id} />
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
