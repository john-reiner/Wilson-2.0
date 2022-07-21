import React, {useState} from 'react'
import { TextInput, PasswordInput, Group, Button, Stack, Anchor } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';

export default function Login(props) {

    // sets the user in state.
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    // sets errors if handleSubmit returns errors
    const [errors, setErrors] = useState('');

    // any errors are cleared as soon as the user starts typing.
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        setErrors('')
    }
    
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
                props.setLoggedIn(true)
            }
            if (data.status === 'unauthorized') {
                setErrors(data.errors)
                setUser({...user, "password": ""})
            }
        });        
    }

    return (
        <form
            onSubmit={handleSubmit} 
            style={{minWidth: "300px"}}
        >
            <Stack>
                <TextInput
                    icon={<At />}
                    placeholder="example@provider.com"
                    required
                    value={user.email} 
                    onChange={handleChange}
                    name={'email'}
                    error={errors && errors}
                    type="email"
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
                    <Anchor
                        onClick={() => props.setComponentViewName("signup")}
                    >
                        Sign Up
                    </Anchor>
                    <Button
                        type="submit"
                    >
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}