import React, { useState } from 'react'
import {Form, Button, Modal} from 'react-bootstrap'

export default function NewGoal(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleDateChange = e => setDate(e.target.value) 

    const onSubmit = e => {
        e.preventDefault()
        fetch("http://localhost:3001/goals", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({
                name: name,
                description: description,
                due_date: date,
                rgb: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            })
        })
        .then(response => response.json())
        .then(goal => {
            if (!goal.error) {
                props.handleNewGoalId(goal.id)
                setName('')
                setDescription('')
                setDate('')
                setErrors('')
                props.onHide()
            } else {
                setErrors(readableError(goal.exception))
            }
        })
    }

    const readableError = error => {
        let errorArray = error.split(':')
        let untrimmedError = errorArray[errorArray.length - 1]
        let wellGroomedError = untrimmedError.trim().slice(0, -1)
        return wellGroomedError
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton >
            <Modal.Title>New Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Goal Name:</Form.Label>
                        <Form.Control type="text" placeholder="Goal Name" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Goal Description</Form.Label>
                        <Form.Control as="textarea" rows={5} value={description} onChange={handleDescriptionChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Complete Goal By: </Form.Label>
                        <Form.Control type="date" onChange={handleDateChange} />
                    </Form.Group>

                    <div className="button-error-container">
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        <div className='error' >{errors}</div>                        
                    </div>
                </Form>
            </Modal.Body>               
        </Modal>
    )
}
