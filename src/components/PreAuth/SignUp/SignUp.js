import React, { useState } from 'react'

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
        <div className="form-container">
            <div className="form-heading-container">
                <h2 >Create a New Account</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-content-container">

                <input type="email" placeholder="name@example.com" name={'email'} value={newUser.email} onChange={handleChange} required/> 
                

                <input type="text" placeholder="First Name" name={'first_name'} value={newUser.first_name} onChange={handleChange} required/> 

                <input type="text" placeholder="Last Name" name={'last_name'} value={newUser.last_name} onChange={handleChange} required/> 

                <input type="password" placeholder="Password" name={'password'} value={newUser.password} onChange={handleChange} required/>

                <input type="password" placeholder="Confirm Password" name={'password_confirmation'} value={newUser.password_confirmation} onChange={handleChange} required/>
                <input type='submit' className='submit-button'/>
                <hr></hr>
                <p id="signup-link" onClick={() => props.setComponentViewName("login")}>Login</p>
            </form>
        </div>
    )
}