import React from 'react'

import { Button } from '@mantine/core';

export default function Tab(props) {

    const handleClick = () => {
        props.handleTabClick(props.name.toLowerCase())
        props.setActiveTabIndex(props.tabIndex)
    }

    return (
        <Button
            compact
            variant="outline"
            color={props.tabIndex === props.activeTabIndex ? props.color : "blue"}
            onClick={handleClick}
        >
            {props.name}
        </Button>
    )
}
