import React from 'react'

import { Stack, Title, Paper, Text, Group } from '@mantine/core';
import { TaskType } from '../taskTypes';

interface TaskInfoProps {
    task: TaskType
}

export default function TaskInfo({
    task,
}: TaskInfoProps) {

    return (
        <Stack>
            <Title order={1}>{task.content}</Title>
            <Paper shadow="xs" p="md" withBorder>
                <Text>{task.description}</Text>
            </Paper>
        </Stack> 
    )
}
