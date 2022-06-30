import React from 'react'
import { Drawer } from '@mantine/core';

export default function TaskShow(props) {

    return (
        <Drawer
            onClose={() => props.setOpened(false)}
            opened={props.opened}
            title={props.content}
            padding="md"
            size="md"
            position="right" 
        >
            {/* Drawer content */}
        </Drawer>

    )
}
