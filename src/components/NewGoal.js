import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import {Form, Button, Modal, Container, Row, Col} from 'react-bootstrap'

function NewGoal(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    // const [date, setDate] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    // const handleDateChange = e => setDate(e.target.value) 

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
                // date: date,
                rgb: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            })
        })
        .then(response => response.json())
        .then(goal => props.handleNewGoalId(goal.id))
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton >
            <Modal.Title>New Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Goal Name:</Form.Label>
                        <Form.Control type="text" placeholder="Goal Name" name={'task'} value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Goal Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={props.onHide}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>               
        </Modal>
    )
}
export default withRouter(NewGoal);
        // <Container style={{backgroundColor: '#333', color: 'white', padding: '10px', borderRadius: '5px'}}>
        //     <Row>
        //         <Col>
        //             <Form onSubmit={onSubmit}>
        //                 <Form.Group>
        //                 <Form.Label>Name</Form.Label>
        //                 <Form.Control type="text" placeholder="Enter Goal Name" name="name" value={name} onChange={handleNameChange} />
        //                 </Form.Group>

        //                 <Form.Group>
        //                     <Form.Label>Goal Description</Form.Label>
        //                     <Form.Control as="textarea" rows="3" name="description" value={description} onChange={handleDescriptionChange}/>
        //                 </Form.Group>

        //                 <Form.Group>
        //                     <Form.Label>Goal Date</Form.Label>
        //                     <br></br>
        //                     <input type="date" name="date" value={date} onChange={handleDateChange}/>
        //                 </Form.Group>

        //                 <Button variant="secondary" type="submit">
        //                     Submit
        //                 </Button>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>