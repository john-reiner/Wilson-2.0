import React, { useState } from 'react'
import { Space, Grid, TextInput, PasswordInput, Group, Button, Stack, Anchor } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';


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

    console.log(newUser)


    return (
        <form onSubmit={handleSubmit} style={{textAlign: "left"}}>
            <Grid grow>
                <Grid.Col md={6} lg={3}>
                    <TextInput
                        placeholder="First name"
                        label="First name"
                        name={'first_name'} 
                        value={newUser.first_name} 
                        onChange={handleChange}
                        required
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <TextInput
                        placeholder="Last name"
                        label="Last name"
                        name={'last_name'} 
                        value={newUser.last_name} 
                        onChange={handleChange}
                        required
                    />
                </Grid.Col>
            </Grid>
            <Space h="sm" />
            <Stack>
                <TextInput
                    label="Email"
                    icon={<At />}
                    placeholder="example@provider.com"
                    required
                    value={newUser.email} 
                    onChange={handleChange}
                    name={'email'}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    required
                    icon={<Lock size={16} />}
                    name={'password'} 
                    value={newUser.password} 
                    onChange={handleChange}
                />       
                <PasswordInput
                    label="Password Confirmation"
                    placeholder="Confirm Password"
                    required
                    icon={<Lock size={16} />}
                    name={'password_confirmation'} 
                    value={newUser.password_confirmation} 
                    onChange={handleChange}
                />
                <Group position="apart" mt="md">
                    <Anchor onClick={() => props.setComponentViewName("login")}>
                        Login
                    </Anchor>
                    <Button type="submit">Submit</Button>
                </Group>   
            </Stack>

        </form>
    )
}
            // <input type="email" placeholder="name@example.com" name={'email'} value={newUser.email} onChange={handleChange} required/> 
            

            // <input type="text" placeholder="First Name" name={'first_name'} value={newUser.first_name} onChange={handleChange} required/> 

            // <input type="text" placeholder="Last Name" name={'last_name'} value={newUser.last_name} onChange={handleChange} required/> 

            // <input type="password" placeholder="Password" name={'password'} value={newUser.password} onChange={handleChange} required/>

            // <input type="password" placeholder="Confirm Password" name={'password_confirmation'} value={newUser.password_confirmation} onChange={handleChange} required/>
            // <input type='submit' className='submit-button'/>
            // <hr></hr>
            // <p id="signup-link" onClick={() => props.setComponentViewName("login")}>Login</p>