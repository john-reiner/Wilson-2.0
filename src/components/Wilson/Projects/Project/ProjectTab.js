import React from 'react'
import { Button } from '@mantine/core';

export default function ProjectTab(props) {

    return (
        <Button
            compact
            variant="outline" 
            color={props.name === props.projectContent ? "green" : "blue"}
            onClick={() => props.changeProjectContent(props.name)}
            // disabled={props.name === props.projectContent}
        >
            {props.name}
        </Button>
    )
}
