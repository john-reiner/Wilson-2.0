import React from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup} from 'react-bootstrap'
import TaskCompleted from './TaskCompleted'

export default function GoalCompleted(props) {

    const renderCompletedTasks = () => {
        return props.tasks.map(task => {
            return <TaskCompleted key={task.id} name={task.name} rgb={props.rgb}/>
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
                <Accordion.Toggle style={{ backgroundColor: props.rgb}} className='goal-listgroup' eventKey={props.id} as={ListGroup.Item}>
                    <div className="goal" >
                            <div className='goal-name'>
                                {props.name}
                            </div>

                            <div className="goal-due">
                                Completed on: {getFormattedDate(props.completedDate)}
                            </div>
                    </div>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body onClick={() => props.handleClickedGoalId(props.id)}>
                    <Button variant="danger" >
                        Show
                    </Button>
                        {renderCompletedTasks()}
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}
