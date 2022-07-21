import React, { useState } from 'react';
import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';

import HeaderContent from './HeaderContent';
import LeftNavBar from './LeftNavBar';
import Wilson from '../Wilson/Wilson';
import PreAuth from '../PreAuth/containers/PreAuth';

export default function Main(props) {

    // sets the them for the app.
    const theme = useMantineTheme();

    // checks the width of the main containers to see if the left-navbar should be opened
    const [opened, setOpened] = useState(false);

    // renders content based on the login flag provided by App.
    const renderContent = loggedIn => {
        if (loggedIn) {
            return (
                <Wilson
                    logout={props.logout}
                />
            )
        } else {
            return (
                <PreAuth 

                />
            )
        }
    }
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
            navbar={ props.loggedIn && 
                <LeftNavBar
                    opened={opened}
                    setOpened={setOpened}
                />
            }
            header={
                <HeaderContent 
                    setOpened={setOpened}
                />
            }
        >
            {renderContent(props.loggedIn)}
        </AppShell>
    );
}

