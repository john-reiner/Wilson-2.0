import React, {useState} from 'react'
import { Button, Drawer, Group, Switch, Stack, Title, TextInput, Box, ActionIcon } from '@mantine/core';
import { ArrowRight } from 'tabler-icons-react';
import DeleteConfirmation from './DeleteConfirmation';

export default function TaskShow(props) {

    const [DeleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

    return (
        <Drawer
            onClose={() => props.setTaskShowOpened(false)}
            opened={props.taskShowOpened}
            // title={props.content}
            padding="md"
            size="md"
            position="right" 
        >
        <DeleteConfirmation 
            id={props.id}
            opened={DeleteConfirmationShow}
            setOpened={setDeleteConfirmationShow}
            setTaskShowOpened={props.setTaskShowOpened}
        />
            <Stack>
                    {
                        props.editShow ? 
                            <form
                                onSubmit={props.submitTask}
                                style={
                                    {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }
                                }
                            
                            >
                                <TextInput
                                    // placeholder={props.content}
                                    name="content"
                                    value={props.content}
                                    onChange={props.handleChange}
                                    required
                                />
                                <ActionIcon
                                    variant="outline"
                                    color="green"
                                    type="submit"
                                    
                                >
                                    <ArrowRight />
                                </ActionIcon>
                            </form>
                        :
                            <Title
                                order={3}
                            >
                                {props.content}
                            </Title>
                    }
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
                            onClick={() => props.setEditShow(!props.editShow)}
                            >
                            Edit
                        </Button>
                        <Button 
                            variant="outline" 
                            color="red"
                            onClick={() => setDeleteConfirmationShow(true)}
                        >
                            Delete
                        </Button>
                    </Group>
            </Stack>
        </Drawer>

    )
}
