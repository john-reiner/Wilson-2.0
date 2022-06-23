import React, {useState} from 'react'
import { Box, Text, Title, Stack, Center } from '@mantine/core';

import Login from './Login'
import SignUp from './SignUp';

export default function PreAuth(props) {

    const [componentViewName, setComponentViewName] = useState('login');

    let componentViews = [
        [<SignUp setComponentViewName={setComponentViewName} setLoggedInStatusChange={props.setLoggedInStatusChange} />, "signup"],
        [<Login setComponentViewName={setComponentViewName} setLoggedInStatusChange={props.setLoggedInStatusChange}/>, "login"],
    ]

    const renderView = (componentViewName, componentViews) => {
        if (componentViewName) {
            let combo = componentViews.find(combo => combo[1] === componentViewName)
            return combo[0]
        }
    }

    return (
        <Center style={{ width: '100vw', height: '60vh' }}>
            <Stack justify="space-around">
                <Title 
                    order={1}
                    className="wilson-logo-full"
                    size="xl"
                    align="center"
                >
                    Wilson
                </Title>
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'center',
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                    })}
                >
                <Stack justify="space-between" >

                    <Text 
                        component="h4"
                        size="xl"
                        align="center"
                    >
                        {componentViewName === 'login' ? "Please login to your account." : "Sign up for Wilson!"}
                    </Text>
                    {renderView(componentViewName, componentViews)}

                </Stack>
                </Box>
            </Stack>
        </Center>
    )
}
