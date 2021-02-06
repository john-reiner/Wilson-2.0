import React, { useState, useEffect } from 'react'
import {Container, Row, Col, ListGroup} from 'react-bootstrap'
import GoalCompleted from './GoalCompleted'

export default function Completed(props) {

    const renderCompletedGoals = () => {
        if (props.completedGoals.length > 0) {
            return props.completedGoals.map(goal => {
                return <GoalCompleted handleClickedGoalId={props.handleClickedGoalId} tasks={goal.tasks} name={goal.name} id={goal.id} rgb={goal.rgb} />
            })
        }
    }

    console.log(props)
    
    return (
        <Container fluid style={{backgroundColor: '#333', color: 'white', padding: '3%', minHeight: "80vh", width: "100%"}}>
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
        // <Container fluid style={{backgroundColor: '#333', color: 'white', padding: '1%', minHeight: "80vh", width: "100%"}}>
            
        //     <Row>
        //         <Col>
        //             <h2>Completed</h2>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col style={{display: "flex", flexWrap: "wrap"}}>
        //             {renderCompletedGoals()}
        //         </Col>
        //     </Row>
        // </Container>