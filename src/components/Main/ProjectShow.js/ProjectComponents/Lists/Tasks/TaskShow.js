import React from 'react'
import { Button, Drawer, Group, Switch, Stack } from '@mantine/core';

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
            <Stack>
                <Switch
                    label="Complete"
                    checked={props.completed}
                    onChange={props.handleChecked}
                    name="completed"
                    value={props.completed}
                >

                </Switch>
                <Group
                    position="apart"
                >
                    <Button
                        variant='outline'
                        color='gray'
                        >
                        Edit
                    </Button>
                    <Button 
                        variant="outline" 
                        color="red"
                    >
                        Delete
                    </Button>
                </Group>
            </Stack>
        </Drawer>

    )
}
