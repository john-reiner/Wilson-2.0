import React, {useState, useEffect} from 'react'
import useFetch from '../../../hooks/useFetch';


export default function SignUpStepOne(props) {

    const [error, setError] = useState("");

    const [{requestedData, loading, errors}, goFetch, clearFetch] = useFetch(null)

    useEffect(() => {
        if (requestedData.length > 0) props.setNextStep(true)        
        if (errors.length > 0) setError(errors)
    }, [requestedData, errors, props]);

    const handleSubmit = e => {
        e.preventDefault()

        goFetch("http://localhost:3001/api/v2/email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: props.newUser})
            }
        )
    }

    console.log({requestedData, loading, errors})

    return (
        <div>Signup Step one</div>
    )
}

        // <Form onSubmit={handleSubmit} id='signup-form'>
        //     {error.length > 0 && <small className='text-secondary'>{errors}</small>}
        //     <FloatingLabel
        //         controlId="floatingInput"
        //         label="Email address"
        //         className="mb-3"
        //     >
        //     <Form.Control type="email" placeholder="name@example.com" name={'email'} value={props.newUser.email} onChange={props.handleChange} required/>
        //     </FloatingLabel>
        //     <Stack>
        //         {loading ? <Button variant="secondary" disabled>Loading...</Button> : <Button id={'login-button'} variant="secondary" type="submit">Next</Button>}
        //     </Stack>
        // </Form>