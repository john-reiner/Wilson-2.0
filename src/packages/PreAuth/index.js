import React from 'react'

import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';

import HeaderContainer from './containers/HeaderContainer';
import AuthContainer from './containers/AuthContainer';

export default function PreAuth(props) {

    const theme = useMantineTheme();

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
