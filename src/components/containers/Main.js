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

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

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

