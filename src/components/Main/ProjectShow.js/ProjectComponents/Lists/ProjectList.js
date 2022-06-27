import React, {useState, useEffect} from 'react'
import { List, ThemeIcon, Paper, Title, Divider, Grid, TextInput, ActionIcon, Group } from '@mantine/core';
import { CircleCheck, CircleDashed, ArrowBarDown } from 'tabler-icons-react';
import Task from './Task';

export default function ProjectList(props) {


    const [tasks, setTasks] = useState([]);

    const [listTask, setListTask] = useState({
        content: "",
        completed: false
    });

    useEffect(() => {
        fetchTasks()
    }, []);

    const handleChange = e => setListTask({...listTask, [e.target.name]: e.target.value})

    const fetchTasks = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}/project_lists/${props.listId}/project_list_tasks`)
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "ok") {
                setTasks(payload.tasks)
                // props.setFetchAgainFlag(true)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}/project_lists/${props.listId}/project_list_tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project_list_task: listTask})
                })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "created") {
                setListTask({
                    content: "",
                    completed: false
                })
                setTasks([...tasks, payload.message] )
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderTasks = () => {
        if (tasks.length > 0) {
            return tasks.map(task => {
                return <Task 
                            taskId={task.id}
                            key={task.key}
                            content={task.content}
                            completed={task.completed}
                        />
            })
        }
    }
    
    return (
        <Grid.Col md={6}>
            <Paper shadow="xs" p="md">
                    <Title order={3}>{props.title}</Title>
                    <Divider my="sm" />
                    <List
                        spacing="xs"
                        size="sm"
                        center
                        icon={
                        <ThemeIcon color="teal" size={24} radius="xl">
                            <CircleCheck size={16} />
                        </ThemeIcon>
                        }
                    >
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" size={24} radius="xl">
                                <CircleDashed size={16} />
                                </ThemeIcon>
                            }
                        >  
                            <form onSubmit={handleSubmit}>
                                <Group position="apart">
                                    <TextInput
                                        placeholder="List Item..."
                                        radius="xs"
                                        required
                                        name="content"
                                        value={listTask.content}
                                        onChange={handleChange}
                                    />
                                    <ActionIcon type="submit">
                                        <ArrowBarDown />
                                    </ActionIcon>

                                </Group>
                            </form>
                        </List.Item>
                        {renderTasks()}
                    </List>
            </Paper>                    
        </Grid.Col>
    )
}
