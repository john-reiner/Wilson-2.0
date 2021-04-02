import React, { useState } from 'react'
import {Form, Button, Modal} from 'react-bootstrap'

export default function NewGoal(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState({})
    const [color, setColor] = useState('red') 

    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleDateChange = e => setDate(e.target.value)
    const handleColorChange = e => setColor(e.target.value.toLowerCase())

    const onSubmit = e => {
        e.preventDefault()
        fetch("https://wilson-rails.herokuapp.com/goals", {
            method: "POST",
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
            if (goal.errors) {

                setErrors(goal.errors)
            } else {
                props.handleNewGoalId(goal.id)
                setName('')
                setDescription('')
                setDate('')
                setErrors({})
                props.onHide()
            }
        })
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
                        {errors.name && <p className="signup-error">{errors.name[0]}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Goal Description</Form.Label>
                        <Form.Control as="textarea" rows={5} value={description} onChange={handleDescriptionChange}/>
                        {errors.description && <p className="signup-error">{errors.description[0]}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Complete Goal By: </Form.Label>
                        <Form.Control type="date" onChange={handleDateChange} value={date} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Color</Form.Label>
                        <Form.Control as="select" onChange={handleColorChange}>
                            <option>Red</option>
                            <option>Orange</option>
                            <option>Yellow</option>
                            <option>Green</option>
                            <option>Blue</option>
                            <option>Purple</option>
                            <option>Pink</option>
                            <option>White</option>
                            <option>Black</option>
                        </Form.Control>
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
