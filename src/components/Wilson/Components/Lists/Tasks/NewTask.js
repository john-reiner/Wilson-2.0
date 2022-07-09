import React, {useState} from 'react'
import { ActionIcon, TextInput} from '@mantine/core';
import { ArrowBarDown } from 'tabler-icons-react';

export default function NewTask(props) {

    const [task, setTask] = useState({
        content: "",
        completed: false,
        list_id: props.id
    });

    const handleChange = e => setTask({...task, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/tasks`, {
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
                props.setTasks([...props.tasks, payload.task])
                setTask({
                    content: "",
                    completed: false,
                    list_id: props.id
                })
            }
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
