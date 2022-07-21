import React, {useState} from 'react'

import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';

import HeaderContainer from './containers/HeaderContainer';
import AuthContainer from './containers/AuthContainer';

export default function PreAuth(props) {

    const theme = useMantineTheme();

    // const [componentViewName, setComponentViewName] = useState('login');

    // let componentViews = [
    //     [
    //         <SignUp 
    //             setComponentViewName={setComponentViewName} 
    //             setLoggedIn={props.setLoggedIn}

    //         />, "signup"
    //     ],
    //     [
    //         <Login 
    //             setComponentViewName={setComponentViewName} 
    //             setLoggedIn={props.setLoggedIn}

    //         />, "login"
    //     ],
    // ]

    // const renderView = (componentViewName, componentViews) => {
    //     if (componentViewName) {
    //         let combo = componentViews.find(combo => combo[1] === componentViewName)
    //         return combo[0]
    //     }
    // }

    return (
        <AppShell
            styles={{
                main: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            header={
                <HeaderContainer 
                />
            }
        >
            <AuthContainer
                setLoggedIn={props.setLoggedIn}
            />
        </AppShell>
    )
}
