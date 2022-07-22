import React, {useState, useEffect} from 'react'
import { Select, Button, Group, Divider} from '@mantine/core';

export default function ListsNav(props) {

    return (
        <div>
            <Group
                position='apart'
            >
                <Button 
                    onClick={() => props.setContentTitle("newList")}
                    variant={props.contentTitle === "newList" ? "outline" : "filled"}
                >
                    + New List
                </Button> 
                <Button
                    variant={props.contentTitle === "listSelectionContainer" ? "outline" : "filled"}
                    color='green'
                    onClick={() => props.setContentTitle("listSelectionContainer")}
                >
                    Select a List
                </Button>
            </Group>
            <Divider
                my="xs"
            />
        </div>
    )
}
