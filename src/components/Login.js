import React, {useState} from 'react'
import { Form, FloatingLabel, Container, Row, Col, Stack, Button } from 'react-bootstrap';

export default function Login(props) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState(null);
    const [errorShow, setErrorShow] = useState(false);
    const handleErrorClose = () => setErrorShow(false)

    const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        fetch(`http://localhost:3001/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user})
        })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "unauthorized") {
                setErrorShow(true)
                setErrors(payload.message)
            } else if (payload.status === "ok") {
                localStorage.setItem('wilsonUserToken', payload.token)
                props.setToken(payload.token)
            } else {
                console.error(payload)
            }
        })
        .catch(errors => console.error(errors))
    }

    return (
        <Container id="login-container">
            <Row>
                <Col>
                    <Stack gap={3}>
                        <h3 className="text-center" >Log in to your account</h3>
                        <Form onSubmit={handleSubmit} id='login-form'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                            <Form.Control type="email" placeholder="name@example.com" name={'email'} value={user.email} onChange={handleChange} required/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" name={'password'} value={user.password} onChange={handleChange} required />
                            </FloatingLabel>
                            <Stack>
                                <Button id={'login-button'} variant="dark" type="submit">Login</Button>
                            </Stack>
                        </Form>
                        <h6 className="text-center">Don't have an account yet?<Button onClick={() => props.setComponentIndex(1)} variant="link">Sign Up</Button></h6>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
