import React, {useState} from 'react'
import { Box, ActionIcon, Paper,} from '@mantine/core';
import { CircleCheck, CircleDashed, FileX } from 'tabler-icons-react';
import TaskShow from './TaskShow';

export default function Task(props) {

    const [opened, setOpened] = useState(false);
    const [task, setTask] = useState({
        content: props.content,
        completed: props.completed
    });

    const changeTaskComplete = () => {
        setTask({...task, "completed": !task.completed})
        fetch(`http://localhost:3001/api/v2/tasks/${props.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: {completed: !task.completed}})
                })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
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
                opened={opened}
                setOpened={setOpened}
                content={props.content}
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
                        onClick={changeTaskComplete} 
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
                        onClick={() => setOpened(true)}
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
