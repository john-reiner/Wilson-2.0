import React, {useEffect} from 'react'
import useFetch from '../../../hooks/useFetch'
import { Form, FloatingLabel, Stack, Button, Col, Row } from 'react-bootstrap'

export default function SignUpStepTwo(props) {

    const [{requestedData, loading, errors}, goFetch, clearFetch] = useFetch(null)

    useEffect(() => {
        if (requestedData.length > 0) {
            localStorage.setItem("wilsonUserToken", requestedData)
            props.setToken(requestedData)
        }

        if (errors.length > 0) {
            console.log(errors)
        }
    }, [requestedData]);

    const handleSubmit = e => {
        e.preventDefault()

        goFetch("http://localhost:3001/api/v2/users",  {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: props.newUser})
        })

        // fetch("http://localhost:3001/api/v2/users", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({user: props.newUser})
        // })
        // .then(response => response.json())
        // .then(payload => {
        //     if (payload.status === "ok") {
        //         localStorage.setItem("wilsonUserToken", payload.token)
        //         props.setToken(payload.token)
        //     }
        // })
        // .catch(errors => {
        //     setErrors("Database Error: Please try again later.")
        //     setLoading(false)
        //     console.error(errors)
        // })
    }

    

    return (
        <Form onSubmit={handleSubmit} id='signup-form'>
            <h6 className="text-center">elksome <span className="text-secondary">{props.newUser.email}</span>!</h6> 
            <h6 className="text-center mb-3">Please fill out the form below.</h6>
            <Row>
                <Col>
                    <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" name={'first_name'} value={props.newUser.first_name} onChange={props.handleChange} required/>
                    </FloatingLabel>                
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" name={'last_name'} value={props.newUser.last_name} onChange={props.handleChange} required/>
                    </FloatingLabel>                
                </Col>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="name@example.com" name={'password'} value={props.newUser.password} onChange={props.handleChange} required/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="name@example.com" name={'password_confirmation'} value={props.newUser.password_confirmation} onChange={props.handleChange} required/>
                    </FloatingLabel>                
                </Col>
            </Row>
            <Stack>
                {/* <Button variant="secondary" type="submit">N</Button> */}
            </Stack>
        </Form>
    )
}