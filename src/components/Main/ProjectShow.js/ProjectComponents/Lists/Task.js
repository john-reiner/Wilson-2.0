import React, {useState} from 'react'
import { List, ThemeIcon, Paper } from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';
import TaskShow from './TaskShow';

export default function Task(props) {

    const [opened, setOpened] = useState(false);

    console.log(opened, props.content)

    return (
        <Paper shadow="md" radius="xs" p="sm" withBorder>
            <TaskShow 
                opened={opened}
                setOpened={setOpened}
                content={props.content}
            />
            <List.Item
                icon={
                    <ThemeIcon color={props.completed ? "green" : "blue"} size={24} radius="xl">{ props.completed ? <CircleCheck size={16} /> : <CircleDashed/>}</ThemeIcon>
                }
                onClick={() => setOpened(true)}
            >


                {props.content}
            </List.Item>
        </Paper>
    )
}
