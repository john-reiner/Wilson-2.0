import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';

export default function Login(props) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value})
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 'ok') {
                localStorage.setItem('wilsonUserToken', data.message)
                props.setLoggedInStatusChange(true)
            }
            if (data.status === 'unauthorized') {
                alert(data.errors)
            }

        });        
    }

    return (
        <Container>
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