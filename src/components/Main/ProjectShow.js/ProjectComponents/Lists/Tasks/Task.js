import React, {useState, useEffect} from 'react'
import { Box, ActionIcon, Paper,} from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';
import TaskShow from './TaskShow';

export default function Task(props) {

    const [taskShowOpened, setTaskShowOpened] = useState(false)
    const [completeChange, setCompleteChange] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [task, setTask] = useState({
        content: props.content,
        completed: props.completed
    });

    console.log(task)

    useEffect(() => {
        if (completeChange) {
            updateTask()
            setCompleteChange(false)
        }
    }, [completeChange]);

    const handleChange = e => {
        setTask({...task, [e.target.name]:e.target.value})
    }

    const handleChecked = () => {
        setTask({...task, 'completed': !task.completed})
        setCompleteChange(true)
    }

    const submitTask = e => {
        e.preventDefault()
        updateTask()
    }

    const updateTask = e => {
        fetch(`http://localhost:3001/api/v2/tasks/${props.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: task})
                })
        .then(response => response.json())
        .then(payload => {
            setTask(payload)
            setEditShow(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Paper 
            shadow="md" 
            radius="xs" 
            p="xs" 
            withBorder
        >
            <TaskShow 
                taskShowOpened={taskShowOpened}
                setTaskShowOpened={setTaskShowOpened}
                content={task.content}
                completed={task.completed}
                handleChange={handleChange}
                handleChecked={handleChecked}
                submitTask={submitTask}
                setEditShow={setEditShow}
                editShow={editShow}
                id={props.taskId}
            />
                <Box 
                    style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }
                >
                    <ActionIcon 
                        onClick={handleChecked} 
                        color={task.completed ? "green" : "blue"}
                        size={24} 
                        radius="xl"
                    >
                        { 
                            task.completed ? 
                                <CircleCheck /> 

                            : 

                                <CircleDashed/>
                        }
                    </ActionIcon>
                    <Box 
                        onClick={() => setTaskShowOpened(true)}
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            // textAlign: 'center',
                            padding: theme.spacing.sm,
                            borderRadius: theme.radius.xs,
                            cursor: 'pointer',
                            width: "100%",
                            marginLeft: theme.spacing.sm,

                            '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                        })}
                    >
                        {task.content}
                    </Box>
                </Box>
        </Paper>
    )
}
