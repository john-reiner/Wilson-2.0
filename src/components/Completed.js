import React, { useState, useEffect } from 'react'
import {Container, Row, Col, ListGroup} from 'react-bootstrap'
import GoalCompleted from './GoalCompleted'
import { withRouter } from 'react-router-dom';

function Completed(props) {

    const [completedGoals, setCompletedGoals] = useState([])

    useEffect(() => {
        fetchGoals()
    }, [])

    const fetchGoals = () => {
        fetch(`https://wilson-rails.herokuapp.com/goals`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(goals => {
            if (goals.error) {
                props.history.push('/')
            } else {
                let goalsComplete = []
                goals.forEach(goal => {
                    if (goal.completed) {
                        goalsComplete.push(goal)
                    }
                })
            setCompletedGoals(goalsComplete)
        }
        })
    }


    const renderCompletedGoals = () => {
        if (completedGoals.length > 0) {
            return completedGoals.map(goal => {
                return <GoalCompleted key={goal.id} completedDate={goal.completed_date} handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} name={goal.name} id={goal.id} rgb={goal.rgb} />
            })
        }
    }
    
    return (
        <Container fluid style={{backgroundColor: '#333', color: 'white', padding: '3%', minHeight: "80vh", width: "100%"}}>
            <Col id='completed-title-container'>
                <h1>Completed</h1>
            </Col>

            <Row>
                <Col>
                    <hr style={{borderTop: "3px solid white"}}/>
                    <ListGroup>
                        {renderCompletedGoals()}
                    </ListGroup>
                </Col>
                
            </Row>
        </Container>
    )        
    
}

export default withRouter(Completed);