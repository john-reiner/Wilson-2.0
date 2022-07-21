import React, {useState} from 'react'
import { Box, Text, Title, Stack, Center, Paper, Container } from '@mantine/core';

import Login from '../Login'
import SignUp from '../SignUp';

export default function PreAuth(props) {

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
            {/* <Stack justify="space-around">

                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'center',
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                    })}
                >
                <Stack justify="space-between" >



                    {renderView(componentViewName, componentViews)}

                </Stack>
                </Box>
            </Stack> */}
        </Container>
    )
}
