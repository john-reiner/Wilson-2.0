import React, {useState} from 'react'
import { ActionIcon, TextInput} from '@mantine/core';
import { ArrowBarDown } from 'tabler-icons-react';

interface NewTaskProps {
    listId: number | string
    route: string
    setFetchList: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewTask({
    listId,
    route,
    setFetchList
}: NewTaskProps) {

    const [task, setTask] = useState({
        content: "",
        completed: false,
        list_id: listId
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setTask({...task, [e.target.name]: e.target.value})

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault()
        fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: task})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setFetchList(true)
            }
            setTask({
                content: "",
                completed: false,
                list_id: listId
            })

        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                placeholder="List Item..."
                radius="xs"
                required
                name="content"
                value={task.content}
                onChange={handleChange}
                rightSection={
                    <ActionIcon type="submit" color={"green"}>
                        <ArrowBarDown />
                    </ActionIcon>
                }
                style={{ marginBottom: 10 }}
            />
        </form>
    )
}
