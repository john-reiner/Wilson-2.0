import React, { useState, useEffect } from 'react'
import {Accordion, Card, Button, ProgressBar, ListGroup} from 'react-bootstrap'
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
        return (dayToCalc - today) / 1000 / 60 / 60 / 24
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
                        {/* <div className='progress' > */}
                            <ProgressBar style={{backgroundColor: "white", color: props.rgb}} now={updateProgress()} />
                        {/* </div> */}

                        <div className="goal-due">
                            {props.due_date && <small>Due in {Math.ceil(calcDaysFromToday(props.due_date) + 1)} days</small>}
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id}>
                    <Card.Body className="goal-body" onClick={() => props.handleClickedGoalId(props.id)}>
                            <LinkContainer to="goal-showpage">
                                <Button variant="secondary" >
                                    Show
                                </Button>
                            </LinkContainer>
                            
                            <Button variant="primary" className='add-task-button' onClick={props.handleTaskModalShow}>Add Task</Button>
                            <Button variant="secondary" className='edit-goal-button' onClick={handleEditModalShow}>Edit</Button>
                            <Button variant="danger" className='delete-goal-button' onClick={handleDeleteModalShow}>Delete</Button>
                            
                        {renderTasks()}

                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}