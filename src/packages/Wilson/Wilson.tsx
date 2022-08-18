import React, {useState, useEffect} from 'react'

import {
    useMantineTheme,
    AppShell,
    Navbar,
} from '@mantine/core';

import MainHeader from './containers/MainHeader';
import MainLeftNavBar from './containers/MainLeftNavBar'
import Main from './containers/Main';
import { ROUTE } from '../../routes';

interface WilsonProps {
    logout: () => void
}

export default function Wilson({
    logout
}: WilsonProps) {

    const userRoute = `${ROUTE}/user`

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = () => {
        fetch(userRoute, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
        })
        .then(response => response.json())
        .then(data => {
        if (data.status === "ok") {
            setUser(data.user)
        } else {
            alert("something went wrong...")
        }
        });
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
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>

                    <MainLeftNavBar 
                        setViewToShow={setViewToShow} 
                        logout={logout}
                        opened={opened}
                    />

                </Navbar>
            }
            header={
                <MainHeader 
                    opened={opened}
                    setOpened={setOpened}
                />
            }
        >
            <Main 
                user={user}
                setViewToShow={setViewToShow}
                viewToShow={viewToShow}
            />
        </AppShell>
    )
}