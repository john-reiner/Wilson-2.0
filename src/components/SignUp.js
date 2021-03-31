import React, { useState } from 'react'
import {Spinner, Form, Button, Modal} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';


function SignUp(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleConfirmedPasswordChange = e => setConfirmedPassword(e.target.value)

    const onSubmit = e => {
        setErrors({})
        e.preventDefault()
        fetch("https://wilson-rails.herokuapp.com/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: confirmedPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.errors) {
                setErrors(user.errors)
            } else {
                console.log("USER", user)
                props.setLoggedinUserId(user.id)
                props.loginUser(username, password)
                props.handleSignUpClose()
            }
            setLoading(false)
        })
        .catch(errors => {
            setErrors("Database Error: Please try again later.")
            setLoading(false)
        })
        setLoading(true)
    }

    return (
        <Modal
            show={props.signUpShow}
            onHide={props.handleSignUpClose}
            backdrop="static"
            keyboard={false}
            size='lg'
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up for Wilson!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
            
                        <Form.Group >
                            <Form.Label>Create Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                            {errors.username && <p className="signup-error">{errors.username[0]}</p>}
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            {errors.password && <p className="signup-error">{errors.password[0]}</p>}
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Re-enter password:</Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password" value={confirmedPassword} onChange={handleConfirmedPasswordChange} />
                            {errors.password_confirmation && <p className="signup-error">{errors.password_confirmation[0]}</p>}
                        </Form.Group>
                            {loading ?   <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading...</Button> : <Button id={'login-button'} variant="primary" type="submit">Sign Up</Button>}
                    </Form>
                </Modal.Body>
                
            </Modal>
    )
}

export default withRouter(SignUp);