import React from 'react'

import { Stack, Textarea, TextInput, Button } from '@mantine/core';
import { TaskType } from '../taskTypes';

interface EditTaskProps {
    route: string
    task: TaskType
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
}

export default function EditTask({
    route,
    task,
    handleChange,
    setEdit,
    setTask
}: EditTaskProps) {

    console.log(route)

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: task})
            }
        )
        .then(response => response.json())
        .then(payload => {
            setTask(payload)
            setEdit(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    value={task.content}
                    size="xl"
                    onChange={handleChange}
                    name='content'
                >
                </TextInput>
                {/* <Paper shadow="xs" p="md" withBorder>
                    <Text>Created: {task.created_at}</Text>
                    <Text>Due: {task.due_date}</Text>
                </Paper> */}
                <Textarea
                    autosize
                    value={!task.description ? "" : task.description}
                    onChange={handleChange}
                    name="description"
                />
                <Button type="submit" variant='outline'>Submit</Button>
            </Stack>
        </form>
    )
}
