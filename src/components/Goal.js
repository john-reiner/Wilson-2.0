import React, { useState, useEffect } from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup, Navbar, Nav, Container} from 'react-bootstrap'
import Task from './Task'
import CompleteGoal from './CompleteGoal'
import DeleteModal from './DeleteModal'
import EditGoalModal from './EditGoalModal'
import { LinkContainer } from "react-router-bootstrap";

export default function Goal(props) {

    const [completedTaskCount, setCompletedTaskCount] = useState(0)
    const [completeModalShow, setCompleteModalShow] = useState(false)
    const [deleteModleOpen, setDeleteModalOpen] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    const handleCompleteModalShow = () => setCompleteModalShow(true)
    const handleCompleteModalClose = () => setCompleteModalShow(false)
    const handleDeleteModalShow = () => setDeleteModalOpen(true)
    const handleDeleteModalClose = () => setDeleteModalOpen(false)

    const handleEditModalShow = () => setEditModalShow(true)
    const handleEditModalClose = () => setEditModalShow(false)

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
    }

    const checkIfCompleted = () => {
        if (updateProgress() === 100) {
            handleCompleteModalShow()
        }
    }
    
    useEffect(() => {
        updateProgress()
        checkIfCompleted()
    }, [completedTaskCount])

    const completeGoal = (id) => {
        fetch(`https://wilson-rails.herokuapp.com/complete-goal/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(goal => {
            if (goal.completed) {
                handleCompleteModalClose()
                props.getCompletedGoalId(goal.id)
            }
        })
    }


    let calcDaysFromToday = (date) => {
        let today = new Date()
        let dayToCalc = new Date(date)
        let returnDate = (dayToCalc - today) / 1000 / 60 / 60 / 24
        console.log(returnDate)
        return returnDate <=  1 ? "Today" : `Due in ${Math.ceil(returnDate)} days`
    }



    const renderTasks = () => {
        return props.tasks.map(task => {
            return <Task getRemovedTaskId={props.getRemovedTaskId} handleNewTaskId={props.handleNewTaskId} handleProgressBarChange={handleProgressBarChange} completeTask={props.completeTask} completed={task.completed} rgb={props.rgb} id={task.id} name={task.name} key={task.id}/>
        })
    }

    return (
        <div>
            <EditGoalModal getCompletedGoalId={props.getCompletedGoalId} id={props.id} due_date={props.due_date} name={props.name} date={props.date} description={props.description} color={props.rgb} handleEditModalClose={handleEditModalClose} onHide={handleEditModalClose} handleEditModalShow={handleEditModalShow} show={editModalShow} />
            <DeleteModal getCompletedGoalId={props.getCompletedGoalId} id={props.id} handleDeleteModalClose={handleDeleteModalClose} name={props.name} show={deleteModleOpen} />
            <CompleteGoal id={props.id} completeGoal={completeGoal} show={completeModalShow} onHide={handleCompleteModalClose}  />
            <Accordion >
                <Accordion.Toggle className='goal-listgroup' style={{ backgroundColor: props.rgb}} eventKey={props.id} as={ListGroup.Item} >
                    <div className="goal" >
                        <div className='goal-name'>
                            {props.name}
                        </div>
                            <ProgressBar style={{backgroundColor: "white", color: props.rgb}} now={updateProgress()} />
                        <div className="goal-due">
                            {props.due_date && <small>{calcDaysFromToday(props.due_date)}</small>}
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body className="goal-body" onClick={() => props.handleClickedGoalId(props.id)}>

                    <Navbar expand="md" className="justify-content-center">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="goal-navbar">
                            <Nav.Item>
                                <LinkContainer to="goal-showpage">
                                    <Button variant="success">Show</Button>
                                </LinkContainer>                                    
                            </Nav.Item>
                            <Nav.Item><Button variant="primary" onClick={props.handleTaskModalShow}>Add Task</Button></Nav.Item>
                            <Nav.Item><Button variant="secondary" onClick={handleEditModalShow}>Edit</Button></Nav.Item>
                            <Nav.Item><Button variant="danger" onClick={handleDeleteModalShow}>Delete</Button></Nav.Item>
                        </Navbar.Collapse>
                    </Navbar>
                            
                        {renderTasks()}

                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}