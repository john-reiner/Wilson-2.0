import React from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup} from 'react-bootstrap'
import TaskCompleted from './TaskCompleted'
import { LinkContainer } from "react-router-bootstrap";

export default function GoalCompleted(props) {

    const renderCompletedTasks = () => {
        return props.tasks.map(task => {
            return <TaskCompleted name={task.name} rgb={props.rgb}/>
        })
    }

    function getFormattedDate(d) {
        var date = new Date(d);
        var month = date.getMonth() + 1;
        var day = date.getDate() + 1;
        var year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    return (
        <div style={{ padding: '0px', display: "inline-block"}}>
            <Accordion>
                <Accordion.Toggle eventKey={props.id} as={ListGroup.Item} style={{color: "white", backgroundColor: props.rgb, border: `sold white 10px`}}>
                        <div style={{userSelect: "none", color: "#333", backgroundColor: 'whitesmoke', padding: '4px'}}>
                            {props.name}
                            <div><small>Completed on: {getFormattedDate(props.completedDate)}</small></div>
                        </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body onClick={() => props.handleClickedGoalId(props.id)}>
                            <LinkContainer to="goal-showpage">
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
