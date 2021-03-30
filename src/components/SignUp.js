import React, { useState } from 'react'
import {Spinner, Form, Button, Modal} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';


function SignUp(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false);
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
                props.history.push('/login')
                setLoading(false)
                props.handleSignUpClose()
            } else {
                console.log(user)
                setErrors(readableError(user.exception))
            }
        })
        setLoading(true)
    }

    const readableError = error => {
        let errorArray = error.split(':')
        let untrimmedError = errorArray[errorArray.length - 1]
        let wellGroomedError = untrimmedError.trim().slice(0, -1)
        return wellGroomedError
    }
    console.log(errors)
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
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Re-enter password:</Form.Label>
                            <Form.Control type="password" placeholder="Re-enter password" value={confirmedPassword} onChange={handleConfirmedPasswordChange} />
                        </Form.Group>
                            {loading ?   <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading...</Button> : <Button id={'login-button'} variant="primary" type="submit">Sign Up</Button>}
                            {/* <Button variant="primary" type="submit">
                            Sign Up
                        </Button> */}
                    </Form>
                </Modal.Body>
                
                    {<Modal.Footer></Modal.Footer>}
                
            </Modal>
    )
}

export default withRouter(SignUp);
            // <ModalErrors show={errorModalShow} handleErrorClose={handleErrorClose} errors={errors}/>
            // <Container style={{backgroundColor: '#333', color: 'white', padding: '3%'}}>
            //     <Row>
            //         <Col>
       
            //         </Col>
            //     </Row>
            // </Container>