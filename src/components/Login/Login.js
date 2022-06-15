import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import useFetch from '../../hooks/useFetch';

export default function Login(props) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const [{requestedData: token, loading, errors}, goFetch, clearFetch] = useFetch(null)

    useEffect(() => {
        
        if (token.length > 0) {

            localStorage.setItem('wilsonUserToken', token)
            props.setLoggedInStatusChange(true)
        } 
        if (errors.length > 0) {
            setError(errors)
        }
    }, [token, errors, props]);

    const handleChange = (e) => {
        if (error.length > 0) {
            clearFetch()
            setError("")
        }
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        goFetch(`http://localhost:3001/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user})
        })
    }

    return (
        <Container>
            {error.length > 0 && <h3 className="text-center" style={{color: "red"}}>{error}</h3>}
            <h3 className="text-center" >Log in to your account</h3>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br></br>
                <input type="email" placeholder="name@example.com" name={'email'} value={user.email} onChange={handleChange} required/><br></br>
                <label>Password:</label><br></br>
                <input type="password" placeholder="Password" name={'password'} value={user.password} onChange={handleChange} required/><br></br>
                <input type="submit" value="Submit"/>
            </form>
        </Container>
    )
}

                        // <Form onSubmit={handleSubmit} >
                        //     <FloatingLabel
                        //         controlId="floatingInput"
                        //         label="Email address"
                        //         className="mb-3"
                        //     >
                        //     <Form.Control type="email" placeholder="name@example.com" name={'email'} value={user.email} onChange={handleChange} required/>
                        //     </FloatingLabel>
                        //     <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        //         <Form.Control type="password" placeholder="Password" name={'password'} value={user.password} onChange={handleChange} required />
                        //     </FloatingLabel>
                        //     <Stack>
                        //         <Button id={'login-button'} variant="secondary" type="submit">Login</Button>
                        //     </Stack>
                        // </Form>
                        // <h6 className="text-center">Don't have an account yet?<Button onClick={() => props.setComponentIndex(1)} variant="link">Sign Up</Button></h6>