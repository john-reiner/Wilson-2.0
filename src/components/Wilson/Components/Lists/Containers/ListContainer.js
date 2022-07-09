import React, {useState, useEffect} from 'react'
import { Grid, Divider, Paper, List, Title, Text } from '@mantine/core';
import Task from '../Tasks/Task';
import NewTask from '../Tasks/NewTask';

export default function ProjectList(props) {

    const [tasks, setTasks] = useState([]);

    const [listTask, setListTask] = useState({
        content: "",
        completed: false,
        list_id: props.listId
    });

    useEffect(() => {
        setTasks(props.tasks)
    }, [props.tasks]);

    const handleChange = e => setListTask({...listTask, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/tasks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: listTask})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setListTask({
                    content: "",
                    completed: false,
                    list_id: props.listId
                })
                setTasks([...tasks, payload.message] )
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderTasks = () => {
        if (tasks) {
            return tasks.map(task => {
                return <Task
                            taskId={task.id}
                            key={task.id}
                            content={task.content}
                            completed={task.completed}
                        />
            })
        }
    }
    
    return (
        <Grid.Col>
            <Paper shadow="md" p="xs" withBorder>
                <Title order={4}>
                    <Text lineClamp={1}>
                        {props.title}
                    </Text>
                </Title>
                <NewTask 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    listTask={listTask}
                />
                <Divider my="sm" />
                <List
                    spacing="xs"
                    size="sm"
                    center
                >
                    {renderTasks()}
                </List>
            </Paper>
        </Grid.Col>
    )
}
