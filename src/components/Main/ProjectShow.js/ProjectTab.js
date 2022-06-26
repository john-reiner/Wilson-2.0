import React from 'react'
import { Button } from '@mantine/core';

export default function ProjectTab(props) {

    return (
        <Button
            compact
            variant="outline" 
            color="green"
            onClick={() => props.changeProjectContent(props.name)}
            disabled={props.name === props.projectTab}
        >
            {props.name}
        </Button>
    )
}
