import React from 'react'
import { Stack, Button } from '@mantine/core';

export default function LeftNavbar(props) {
    return (
        <Stack spacing="sm" style={{height: "100%"}}>
            <Button variant="outline" onClick={() => props.setViewToShow(0)}>Projects</Button>
            <Button variant="outline">Lists</Button>
            <Button variant="outline">Something Else</Button>
        </Stack>
    )
}
