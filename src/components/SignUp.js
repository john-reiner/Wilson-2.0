import React, { useState } from 'react'
import ModalErrors from './ModalErrors'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';


function SignUp(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [errorModalShow, setErrorModalShow] = useState(false)

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleConfirmedPasswordChange = e => setConfirmedPassword(e.target.value)

    const handleErrorShow = () => setErrorModalShow(true)
    const handleErrorClose = () => setErrorModalShow(false)

    const onSubmit = e => {
        e.preventDefault()
        fetch("https://wilson-rails.herokuapp.com/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.message) {
                props.history.push('/wilson-2.0')
            } else {
                setErrors(readableError(user.exception))
                handleErrorShow()
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
        <div>
            <ModalErrors show={errorModalShow} handleErrorClose={handleErrorClose} errors={errors}/>
            <Container style={{backgroundColor: '#333', color: 'white', padding: '3%'}}>
                <Row>
                    <Col>
                        <Form onSubmit={onSubmit}>
                        
                            <Form.Group >
                                <Form.Label>Create Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Re-enter password:</Form.Label>
                                <Form.Control type="password" placeholder="Re-enter password" value={confirmedPassword} onChange={handleConfirmedPasswordChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(SignUp);