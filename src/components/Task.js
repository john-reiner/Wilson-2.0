
import React, { useState, useEffect }  from 'react'
import {ListGroup, Form, Button} from 'react-bootstrap'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'

export default function Task(props) {

    const [clicked, setClicked] = useState(props.completed)
    const [completeModalShow, setCompleteModalShow] = useState(false)
    const [deleteModleOpen, setDeleteModalOpen] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    const handleDeleteModalShow = () => setDeleteModalOpen(true)
    const handleDeleteModalClose = () => setDeleteModalOpen(false)
    const handleEditModalShow = () => setEditModalShow(true)
    const handleEditModalClose = () => setEditModalShow(false)

    const handleCheckClick = id => {
        props.completeTask(id)
        setClicked(!clicked)
        if (clicked === true) {
            props.handleProgressBarChange(-1)
        } else {
            props.handleProgressBarChange(1)
        }
    }

    return (
        <div>
            <EditTaskModal handleNewTaskId={props.handleNewTaskId} id={props.id} onHide={handleEditModalClose} name={props.name} show={editModalShow} />
            <DeleteTaskModal handleNewTaskId={props.handleNewTaskId} id={props.id} handleDeleteModalClose={handleDeleteModalClose} name={props.name} show={deleteModleOpen} />
            <ListGroup.Item className='task' style={{textDecoration: clicked ? 'line-through' : '', backgroundColor: props.rgb }} >
                <div className='task-body'>
                    <Form.Check 
                        custom
                        onClick={() => handleCheckClick(props.id)}
                        defaultChecked={props.completed}
                        id={props.id}
                        className="check"
                    />
                    {props.name}
                    <Button className='delete-task-button' variant="danger" size="sm" onClick={handleDeleteModalShow}>
                        Remove
                    </Button>
                    <Button className='edit-task-button' variant="secondary" size="sm" onClick={handleEditModalShow}>
                        Edit
                    </Button>
                </div>
            </ListGroup.Item>
        </div>
    )
}

// textDecoration: props.completeTaskids.includes(props.id) ? 'line-through' : ''