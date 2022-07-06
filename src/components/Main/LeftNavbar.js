import React from 'react'
import { Stack, Button, Box } from '@mantine/core';

export default function LeftNavbar(props) {
    return (
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
                <Button variant="outline">Lists</Button>
                <Button variant="outline">Something Else</Button>
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
    )
}
