import React, { useState } from 'react'
import {Spinner, Form, Button, Modal} from 'react-bootstrap'



export default function SignUp(props) {

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => setNewUser({...newUser, [e.target.name]: e.target.value})
    
    const handleSubmit = e => {
        setErrors({})
        e.preventDefault()
        fetch("http://localhost:3001/api/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: newUser})
        })
        .then(response => response.json())
        .then(user => {
            if (user.errors) {
                setErrors(user.errors)
            } else {
                localStorage.setItem('wilsonUserToken', user.token)
                props.handleSignupClose()
            }
            setLoading(false)
        })
        .catch(errors => {
            setErrors("Database Error: Please try again later.")
            setLoading(false)
            console.log(errors)
        })
        setLoading(true)
    }

    return (
        <Modal
            show={props.signupShow}
            onHide={props.handleSignupClose}
            backdrop="static"
            keyboard={false}
            size='lg'
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up for Wilson!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group >
                            <Form.Label>Create Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name={"username"} value={newUser.username} onChange={handleChange} />
                            {errors.username && <p className="signup-error">{errors.username[0]}</p>}
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" name={"password"} value={newUser.password} onChange={handleChange} />
                            {errors.password && <p className="signup-error">{errors.password[0]}</p>}
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Re-enter password:</Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password" name={"password_confirmation"} value={newUser.confirmedPassword} onChange={handleChange} />
                            {errors.password_confirmation && <p className="signup-error">{errors.password_confirmation[0]}</p>}
                        </Form.Group>
                            {loading ?   <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading...</Button> : <Button id={'login-button'} variant="primary" type="submit">Sign Up</Button>}
                    </Form>
                </Modal.Body>
                
            </Modal>
    )
}