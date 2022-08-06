import React, {useState} from 'react'
import {ComponentViews} from '../preAuthInterfaces'

import { Text, Title, Stack, Paper, Container } from '@mantine/core';

import SignUp from '../components/SignUp'
import Login from '../components/Login'

interface AuthContainerProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthContainer({
    setLoggedIn
}: AuthContainerProps) {

    const [componentViewName, setComponentViewName] = useState<keyof ComponentViews>('login');

    const componentViews: ComponentViews = {
        "signup": <SignUp 
                    setComponentViewName={setComponentViewName} 
                    setLoggedIn={setLoggedIn}
                />,
        "login": <Login 
                    setComponentViewName={setComponentViewName} 
                    setLoggedIn={setLoggedIn}
                />
    }

    const renderView = (
        componentViewName: keyof ComponentViews, 
        componentViews: ComponentViews
        ) => {
        return componentViews[componentViewName]
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
                            // size="xl"
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
