import React, {useState} from 'react'
import { Text, Title, Stack, Paper, Container, Divider } from '@mantine/core';

import SignUp from '../components/SignUp'
import Login from '../components/Login'

export default function AuthContainer(props) {

    const [componentViewName, setComponentViewName] = useState('login');

    let componentViews = [
        [
            <SignUp 
                setComponentViewName={setComponentViewName} 
                setLoggedIn={props.setLoggedIn}

            />, "signup"
        ],
        [
            <Login 
                setComponentViewName={setComponentViewName} 
                setLoggedIn={props.setLoggedIn}

            />, "login"
        ],
    ]

    const renderView = (componentViewName, componentViews) => {
        if (componentViewName) {
            let combo = componentViews.find(combo => combo[1] === componentViewName)
            return combo[0]
        }
    }

    return (
            <Container
                size="xs" 
                px="xs"
                style={
                    { 
                        marginTop: "10%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }
                }
            >
                <Paper
                    shadow="md" 
                    p="md"
                >
                    <Stack>
                        <Title 
                            order={1}
                            className="wilson-logo-full"
                            size="xl"
                            align="center"
                            color="green"
                        >
                            Wilson
                        </Title>
                        <Text 
                            size="sm"
                            align="center"
                        >
                            {componentViewName === 'login' ? "Please login to your account." : "Sign up for Wilson!"}
                        </Text>
                        {renderView(componentViewName, componentViews)}

                    </Stack>
                </Paper>
            </Container>
    )
}
