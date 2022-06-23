import React from 'react'
import { Button } from '@mantine/core';

export default function ProjectTab(props) {

    return (
        <Button
            compact
            variant="outline" 
            color="green"
            onClick={() => props.handleTabClick(props.index)}
            disabled={props.index === props.projectTabIndex}
        >
            {props.name}
        </Button>
    )
}
