import React, {useState} from 'react'
import { TextInput, Paper, ActionIcon, Button, Group, Title, Stack, Divider } from '@mantine/core';
import { X } from 'tabler-icons-react';

export default function NewList(props) {

    const [list, setList] = useState({
        title: ""
    });

    const handleChange = e => setList({...list, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.id}/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: list})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setList({
                    title: "",
                })
                props.setReloadLists(true)
                props.setNewList(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Paper 
            withBorder
            shadow="xs" 
            p="md"
        >
            <Group position="apart">
                <Title order={3}>New List</Title>
                <ActionIcon 
                    onClick={() => props.setNewList(false)}
                    size="sm"
                >
                    <X />
                </ActionIcon>
            </Group>
            <Divider my="sm" />
            <form onSubmit={handleSubmit}>
                <Stack> 
                    <TextInput
                        placeholder="List Title"
                        required
                        value={list.title}
                        onChange={handleChange}
                        name="title"
                    />
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </Paper>
    )
}

