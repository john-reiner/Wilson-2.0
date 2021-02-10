import React, { useState, useEffect } from 'react'
import {Form, Button, Modal} from 'react-bootstrap'

export default function NewGoal(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState('')
    const [color, setColor] = useState('red') 
    const [editCount, setEditCount] = useState(0)

    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleDateChange = e => setDate(e.target.value)
    const handleColorChange = e => setColor(e.target.value)

    useEffect(() => {
        setName(props.name)
        setDescription(props.description)
        setDate(props.due_date)
        setColor(props.color)
    }, [props.name, props.description, props.due_date, props.color])

    const handleSubmit = e => {
        e.preventDefault()
        setEditCount(editCount + 1)
        fetch(`https://wilson-rails.herokuapp.com/goals/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({
                name: name,
                description: description,
                due_date: date,
                rgb: color
            })
        })
        .then(response => response.json())
        .then(goal => {
            if (!goal.error) {
                props.getCompletedGoalId(editCount)
                console.log(goal)
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
            <Modal.Title>Edit Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                        <Form.Control type="date" onChange={handleDateChange} value={date}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Color</Form.Label>
                        <Form.Control as="select" onChange={handleColorChange} value={color}>
                            <option>red</option>
                            <option>orange</option>
                            <option>yellow</option>
                            <option>green</option>
                            <option>blue</option>
                            <option>purple</option>
                            <option>pink</option>
                            <option>white</option>
                            <option>black</option>
                        </Form.Control>
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