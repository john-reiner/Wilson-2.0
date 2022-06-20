import React, {useState, useEffect} from 'react'
import './Login.css'

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
                <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit} className="form-content-container">
                <input type="email" placeholder="Email" name={'email'} value={user.email} onChange={handleChange} required/>
                <input type="password" placeholder="Password" name={'password'} value={user.password} onChange={handleChange} required/>
                <input type="submit" value="Submit" className='submit-button'/>
                <hr></hr>
                <p id="signup-link" onClick={() => props.setComponentViewName("signup")}>Sign up for an account</p>
            </form>
        </div>
    )
}