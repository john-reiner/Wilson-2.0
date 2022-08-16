import React from 'react'

import { Stack, Textarea, TextInput, Button } from '@mantine/core';
import { TaskType } from '../taskTypes';

interface EditTaskProps {
    route: string
    task: TaskType
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
    handleTaskChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void

}

export default function EditTask({
    route,
    task,
    setEdit,
    setTask,
    handleTaskChange
}: EditTaskProps) {

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
                    onChange={handleTaskChange}
                    name='content'
                >
                </TextInput>
                <Textarea
                    autosize
                    value={!task.description ? "" : task.description}
                    onChange={handleTaskChange}
                    name="description"
                />
                <Button type="submit" variant='outline'>Submit</Button>
            </Stack>
        </form>
    )
}
