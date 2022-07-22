import React, {useState, useEffect} from 'react'
import {
    useMantineTheme,
    AppShell,
    Navbar,
} from '@mantine/core';

import MainHeader from './containers/MainHeader';
import MainLeftNavBar from './containers/MainLeftNavBar'
import Main from './containers/Main';

export default function Wilson(props) {

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = () => {
        fetch('http://localhost:3001/api/v2/user', {
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
            // setLoggedIn(false)
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
                        logout={props.logout}
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
                // handleProjectShow={handleProjectShow}
                setViewToShow={setViewToShow}
                viewToShow={viewToShow}
            />
        </AppShell>
    )
}