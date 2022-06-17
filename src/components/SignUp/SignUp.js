import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';

export default function SignUp(props) {

    const [newUser, setNewUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => setNewUser({...newUser, [e.target.name]: e.target.value})
    
    const handleSubmit = e => {
        e.preventDefault()
        console.log(newUser)
        fetch('http://localhost:3001/api/v2/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: newUser})
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
                <input type='submit' /><br></br>
            </form>
        </Container>
    )
}