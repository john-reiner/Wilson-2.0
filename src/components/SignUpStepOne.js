import React, {useState} from 'react'
import { Form, FloatingLabel, Stack, Button } from 'react-bootstrap'

export default function SignUpStepOne(props) {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault()
        fetch("http://localhost:3001/api/v2/email", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: props.newUser})
        })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                props.setNextStep(true)
            }
            console.log(payload)
            setLoading(false)
        })
        .catch(errors => {
            setErrors("Database Error: Please try again later.")
            setLoading(false)
            console.error(errors)
        })
    }

    return (
        <Form onSubmit={handleSubmit} id='signup-form'>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
            <Form.Control type="email" placeholder="name@example.com" name={'email'} value={props.newUser.email} onChange={props.handleChange} required/>
            </FloatingLabel>
            <Stack>
                <Button id={'login-button'} variant="dark" type="submit">Next</Button>
            </Stack>
        </Form>
    )
}
