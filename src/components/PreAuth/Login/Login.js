import React, {useState, useEffect} from 'react'
import { TextInput, PasswordInput, Group, Button, Stack, Anchor } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';

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
        <form onSubmit={handleSubmit} style={{minWidth: "300px"}}>
            <Stack>
                <TextInput
                    icon={<At />}
                    placeholder="example@provider.com"
                    required
                    value={user.email} 
                    onChange={handleChange}
                    name={'email'}
                />
                <PasswordInput
                    placeholder="Password"
                    required
                    icon={<Lock size={16} />}
                    name={'password'} 
                    value={user.password} 
                    onChange={handleChange}
                />
                <Group position="apart" mt="md">
                    <Anchor onClick={() => props.setComponentViewName("signup")}>
                        Sign Up
                    </Anchor>
                    <Button type="submit">Submit</Button>
                </Group>
            </Stack>
        </form>
    )
}
        //         <input type="email" placeholder="Email" name={'email'} value={user.email} onChange={handleChange} required/>
        //         <input type="password" placeholder="Password" name={'password'} value={user.password} onChange={handleChange} required/>
        //         <input type="submit" value="Submit" className='submit-button'/>
        //         <hr></hr>
        //         <p id="signup-link" onClick={() => props.setComponentViewName("signup")}>Sign up for an account</p>
        //     </form>
        // </div>