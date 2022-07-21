import React from 'react'
import {
    Box,
    Navbar,
    Stack,
    Button
} from '@mantine/core';

export default function LeftNavBar(props) {
    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 200, lg: 300 }}>
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
                    <Button variant="outline" onClick={() => props.setViewToShow(0)}>Projects</Button>
                    {/* <Button variant="outline">Lists</Button> */}
                    
                </Stack>
                <Stack>
                    <Button 
                        variant="outline" 
                        color="red"
                        onClick={props.logout}
                    >
                        Sign Out
                    </Button>
                </Stack>
            </Box>
        </Navbar>
    )
}
