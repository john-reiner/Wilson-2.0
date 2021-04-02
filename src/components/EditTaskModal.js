import React, { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'


export default function NewTask(props) {
    
    const [name, setName] = useState(props.name)
    const [errors, setErrors] = useState({})
    const [editCount, setEditCount] = useState(0)

    useEffect(() => {
        setName(props.name)
    }, [props.name])

    const handleChange = e => setName(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        setEditCount(editCount + 1)
        fetch(`https://wilson-rails.herokuapp.com/tasks/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({
                name: name,
            })
        })
        .then(response => response.json())
        .then(task => {
            if (task.errors) {
                setErrors(task.errors)
            } else {
                props.handleNewTaskId(editCount)
                setErrors({})         
                props.onHide()
            }
        })
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task" name={'task'} value={name} onChange={handleChange} />
                        {errors.name && <p className="signup-error">{errors.name[0]}</p>}
                    </Form.Group>
                    <div className="button-error-container">
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>               
        </Modal>
    )
}