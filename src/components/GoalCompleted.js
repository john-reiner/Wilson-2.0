import React, { useState, useEffect } from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup} from 'react-bootstrap'
import TaskCompleted from './TaskCompleted'
import CompleteGoal from './CompleteGoal'
import { LinkContainer } from "react-router-bootstrap";

export default function GoalCompleted(props) {

    const renderCompletedTasks = () => {
        return props.tasks.map(task => {
            return <TaskCompleted name={task.name} rgb={props.rgb}/>
        })
    }

    return (
        <div style={{ padding: '0px', display: "inline-block"}}>
            <Accordion>
                <Accordion.Toggle eventKey={props.id} as={ListGroup.Item} style={{color: "white", backgroundColor: props.rgb, border: `sold white 10px`}}>
                        <div style={{userSelect: "none", color: "#333", backgroundColor: 'whitesmoke', padding: '4px'}}>
                            {props.name}
                        </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body onClick={() => props.handleClickedGoalId(props.id)}>
                            <LinkContainer to="goal_showpage">
                                <Button variant="danger" >
                                    Show
                                </Button>
                            </LinkContainer>
                            
                                
                        {renderCompletedTasks()}

                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}
