import React, { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch';
import Container from 'react-bootstrap/Container';
import SignUpStepOne from './steps/SignUpStepOne';
import SignUpStepTwo from './steps/SignUpStepTwo'

export default function SignUp(props) {

    const [newUser, setNewUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: ""
    });
    const [step, setStep] = useState(0);
    const [nextStep, setNextStep] = useState(false);

    const [{requestedData: token, loading, errors}, goFetch, clearFetch] = useFetch(null)

    useEffect(() => {
        if (nextStep) {
            let newStep = step
            newStep ++ 
            setStep(newStep)
            setNextStep(false)
        }
    }, [nextStep, step]);

    const handleChange = (e) => {
        
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()

        goFetch(`http://localhost:3001/api/v2/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: newUser})
        })
        // setErrors({})
        // fetch("http://localhost:3001/api/v1/users", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({user: newUser})
        // })
        // .then(response => response.json())
        // .then(payload => {
        //     if (payload.errors) {
        //         setErrors(payload.errors)
        //     } else {
        //         localStorage.setItem('wilsonUserToken', payload.token)
        //         props.setToken(payload.token)
        //         props.handleSignupClose()
        //     }
        //     setLoading(false)
        // })
        // .catch(errors => {
        //     setErrors("Database Error: Please try again later.")
        //     setLoading(false)
        //     console.error(errors)
        // })
        // setLoading(true)
    }

    const signupSteps = index => {
        let forms = [
            <SignUpStepOne setNextStep={setNextStep} newUser={newUser} handleChange={handleChange} />,
            <SignUpStepTwo setToken={props.setToken} setNextStep={setNextStep} newUser={newUser} handleChange={handleChange} />
        ]
        return forms[index]
    }

    console.log(token, loading, errors)

    return (
        <Container>
            <h3 className="text-center" >Create a New Account</h3>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br></br>
                <input type="email" placeholder="name@example.com" name={'email'} value={newUser.email} onChange={handleChange} required/> <br></br>
                
                <label>First Name:</label><br></br>
                <input type="text" placeholder="First Name" name={'first_name'} value={newUser.first_name} onChange={handleChange} required/> <br></br>
                <label>Last Name:</label><br></br>
                <input type="text" placeholder="Last Name" name={'last_name'} value={newUser.last_name} onChange={handleChange} required/> <br></br>
                <label>Password:</label><br></br>
                <input type="password" placeholder="Password" name={'password'} value={newUser.password} onChange={handleChange} required/><br></br>
                <label>Password Confirmation:</label><br></br>
                <input type="password" placeholder="Confirm Password" name={'password_confirmation'} value={newUser.password_confirmation} onChange={handleChange} required/><br></br>
                <input type="submit" value="Submit"/>
            </form>
        </Container>
    )
}
        // <Container>
        //     <Row>
        //         <Col className="mt-5 form-container">
        //             <Stack gap={3}>
        //                 <h2 className="text-center" >Welcome to <span className="text-secondary" id="wilson-text">Wilson</span></h2>
        //                 <p className="text-center" >Get started - it's free!</p>
        //                 {signupSteps(step)}
        //                 <h6 className="text-center">Already have an account?<Button onClick={() => props.setComponentIndex(1)} variant="link">Login</Button></h6>
        //             </Stack>
        //         </Col>
        //     </Row>
        // </Container>
    //     <Modal
    //         show={props.signupShow}
    //         onHide={props.handleSignupClose}
    //         backdrop="static"
    //         keyboard={false}
    //         size='lg'
    //         centered
    //         >
    //     <Modal.Header closeButton>
    //         <Modal.Title>Sign Up for Wilson!</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //         <Form onSubmit={handleSubmit}>
    //             <Form.Group >
    //                 <Form.Label>Create Username:</Form.Label>
    //                 <Form.Control type="text" placeholder="Enter username" name={"username"} value={newUser.username} onChange={handleChange} />
    //                 {errors.username && <p className="signup-error">{errors.username[0]}</p>}
    //             </Form.Group>

    //             <Form.Group >
    //                 <Form.Label>Password:</Form.Label>
    //                 <Form.Control type="password" placeholder="Password" name={"password"} value={newUser.password} onChange={handleChange} />
    //                 {errors.password && <p className="signup-error">{errors.password[0]}</p>}
    //             </Form.Group>

    //             <Form.Group >
    //                 <Form.Label>Re-enter password:</Form.Label>
    //                 <Form.Control type="password" placeholder="Re-enter password" name={"password_confirmation"} value={newUser.confirmedPassword} onChange={handleChange} />
    //                 {errors.password_confirmation && <p className="signup-error">{errors.password_confirmation[0]}</p>}
    //             </Form.Group>
    //                 {loading ?   <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading...</Button> : <Button id={'login-button'} variant="primary" type="submit">Sign Up</Button>}
    //         </Form>
    //     </Modal.Body>
        
    // </Modal>