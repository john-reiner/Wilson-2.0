import React, {useState} from 'react'
import { TextInput, Paper, Button, Stack } from '@mantine/core';

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}

interface NewListProps {
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
    setSelectedListId: React.Dispatch<React.SetStateAction<number | undefined>>
    route: string
}

export default function NewList({
    route,
    setContentTitle,
    setSelectedListId
}: NewListProps) {

    const [list, setList] = useState({
        title: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setList({...list, [e.target.name]: e.target.value})

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()
        fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: list})
                })
        .then(response => response.json())
        .then(payload => {
            setList({
                title: "",
            })
            setSelectedListId(payload.id)
            setContentTitle("list")
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
