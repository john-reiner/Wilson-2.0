import React from 'react'
import { Stack, Title, Paper, Text, Textarea, TextInput, Button } from '@mantine/core';


export default function EditTask(props) {

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/tasks/${props.task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: props.task})
            }
        )
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "ok") {
                props.setTask(payload.task)
                props.setEdit(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    value={props.task.content}
                    size="xl"
                    onChange={props.handleChange}
                    name='content'
                >
                </TextInput>
                {/* <Paper shadow="xs" p="md" withBorder>
                    <Text>Created: {props.task.created_at}</Text>
                    <Text>Due: {props.task.due_date}</Text>
                </Paper> */}
                <Textarea
                    autosize
                    value={props.task.description}
                    onChange={props.handleChange}
                    name="description"
                />
                <Button type="submit" variant='outline'>Submit</Button>
            </Stack>
        </form>
    )
}
