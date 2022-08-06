import React from 'react'

import {
    Box,
    Navbar,
    Stack,
    Button
} from '@mantine/core';

interface LeftNavBarProps {
    setViewToShow: React.Dispatch<React.SetStateAction<number>>,
    logout: () => void,
    opened: boolean
}

export default function LeftNavBar({
    setViewToShow,
    logout,
    opened
}:LeftNavBarProps) {

    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Box
                style={
                    {
                        height: '100%',
                        display: 'flex',
                        flexDirection: "column",
                        alignContent: "space-between"
                    }
                }
            >
                <Stack spacing="sm" style={{height: "100%"}}>
                    <Button variant="outline" onClick={() => setViewToShow(0)}>Projects</Button>
                </Stack>
                <Stack>
                    <Button 
                        variant="outline" 
                        color="red"
                        onClick={logout}
                    >
                        Sign Out
                    </Button>
                </Stack>
            </Box>
        </Navbar>
    )
}
