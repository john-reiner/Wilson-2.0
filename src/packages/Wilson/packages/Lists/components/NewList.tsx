import React, {useState} from 'react'
import { TextInput, Paper, Button, Stack } from '@mantine/core';

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}

interface NewListProps {
    listable: "projects" | "features"
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
    projectId: number
    featureId?: number
    setSelectedListId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function NewList({
    listable,
    setContentTitle,
    projectId,
    featureId,
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
        projectId: number,
        featureId: number | undefined
    ) => {
        e.preventDefault()
        let route = `http://localhost:3001/api/v2/projects/${projectId}/lists/`
        if (listable === "features") {
            route = `http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}/lists`
        }
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
            <form onSubmit={(e) => handleSubmit(e, projectId, featureId)}>
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
