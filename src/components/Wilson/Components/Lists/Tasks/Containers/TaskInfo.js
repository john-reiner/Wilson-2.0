import React from 'react'
import { Stack, Title, Paper, Text } from '@mantine/core';


export default function TaskInfo(props) {

    return (
        <Stack>
            <Title order={1}>{props.task.content}</Title>
            {/* <Paper shadow="xs" p="md" withBorder>
                <Text>Created: {props.task.created_at}</Text>
                <Text>Due: {props.task.due_date}</Text>
            </Paper> */}
            <Paper shadow="xs" p="md" withBorder>
                <Text>{props.task.description}</Text>
            </Paper>
        </Stack> 
    )
}
