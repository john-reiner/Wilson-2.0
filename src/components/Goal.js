import React, { useState, useEffect } from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup} from 'react-bootstrap'
import Task from './Task'
import { LinkContainer } from "react-router-bootstrap";


export default function Goal(props) {

    const [completedTaskCount, setCompletedTaskCount] = useState(0)

    useEffect(() => {
        let count = 0
        props.tasks.forEach(task => {
            if (task.completed) {
                count ++
            }
        })
        setCompletedTaskCount(count)
    }, [])

    const handleProgressBarChange = value => {
        setCompletedTaskCount(completedTaskCount + value)
    }
    
    const updateProgress = () => {
        let count = completedTaskCount
        let taskCount = props.tasks.length
        let ratio =  (count / taskCount)
        return ratio * 100
        // if (props.tasks.length !== 0) {
        //     let tasksCount =  props.tasks.length
        //     let completedTasks = 0
        //     props.tasks.forEach(task => {
        //         if (task.completed) {
        //             completedTasks ++
        //         }
        //     })
        //     console.log(completedTasks, completedTaskCount, tasksCount)
        //     return (completedTasks + completedTaskCount / tasksCount) * 100
        // } else {
        //     return 0
        // }
    }
    
    useEffect(() => {
        updateProgress()
    }, [completedTaskCount])

    // const renderTasks = () => {
        //     fetch(`http://localhost:3001/goals/${props.id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(goal => {
    //         let goal_tasks = []
    //         goal.tasks.forEach(task => {
    //             goal_tasks.push(task)
    //         })
    //         setTasks(goal_tasks)
    //     })
    // }

    // const handleTaskChange = () => console.log(completedTaskCount)



    // let calcDaysFromToday = (date) => {
    //     let today = new Date()
    //     let dayToCalc = new Date(date)
    //     return (dayToCalc - today) / 1000 / 60 / 60 / 24
    // }

    // function getFormattedDate(d) {
    //     var date = new Date(d);
    //     var month = date.getMonth() + 1;
    //     var day = date.getDate();
    //     var year = date.getFullYear();
    //     return month + "/" + day + "/" + year;
    // }

    const renderTasks = () => {
        return props.tasks.map(task => {
            return <Task handleProgressBarChange={handleProgressBarChange} completeTask={props.completeTask} completed={task.completed} rgb={props.rgb} id={task.id} name={task.name} key={task.id}/>
        })
    }

    return (
        <div style={{ padding: '0px', display: "inline-block"}}>

            

            <Accordion>
                <Accordion.Toggle eventKey={props.id} as={ListGroup.Item} style={{color: "white", backgroundColor: props.rgb, border: `sold white 10px`}}>
                        <div style={{userSelect: "none", color: "#333", backgroundColor: 'whitesmoke', padding: '4px'}}>
                            {props.name}
                        <ProgressBar animated now={updateProgress()} style={{marginLeft: "10px"}}/>
                        </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body onClick={() => props.handleClickedGoalId(props.id)}>
                            <LinkContainer to="goal_showpage">
                                <Button variant="danger" >
                                    Show
                                </Button>
                            </LinkContainer>
                            
                                <Button variant="primary" onClick={props.handleTaskModalShow}>Add Task</Button>
                                
                        {renderTasks()}

                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}

{/* <Card style={{color: 'black', width: '254px', height:'260px'}} onClick={() => props.handleGoalClick(props.id)}>
<Card.Img variant="top" as='div' style={{ backgroundColor: props.rgb, width: '254px', height: '50px' }} />
<Card.Body>
    <Card.Title>{props.name}</Card.Title>
    <Card.Text>
        <ProgressBar animated now={updateProgress()} />
    </Card.Text>
        {props.taskModalOpen && props.resourceModalOpen ? <Button variant="primary" onClick={props.taskModalOpen}>Add Task</Button> : null}
        {/* {props.resourceModalOpen ? <Button variant="primary" onClick={props.resourceModalOpen}>Add Resource</Button> : null} */}
//     <LinkContainer style={{float: 'right'}} to="goal_showpage">
//         <Button variant="danger" >
//             Show
//         </Button>
//     </LinkContainer>
//     </Card.Body>
//     <Card.Footer>
//     {props.dateComplete ? <small>Completed on: {getFormattedDate(props.dateComplete)}</small> : <small className="text-muted">Due in {Math.ceil(calcDaysFromToday(props.date) + 1)} days</small>}
// </Card.Footer>
