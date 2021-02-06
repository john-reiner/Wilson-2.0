import React, { useState } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'


export default function NewTask(props) {
    
    const [name, setName] = useState('')

    const handleChange = e => setName(e.target.value)

    const onSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({
                name: name,
                goal_id: props.clickedGoalid
            })
        })
        .then(response => response.json())
        .then(task => props.handleNewTaskId(task.id))
        setName('')
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task" name={'task'} value={name} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={props.onHide}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>               
        </Modal>
    )
}