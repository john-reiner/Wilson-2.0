import React, {useState, useEffect} from 'react'
import { Box, ActionIcon, Text, List} from '@mantine/core';
import { CircleCheck, Circle } from 'tabler-icons-react';
import TaskShow from '../Containers/TaskShow';

export default function Task(props) {

    const [taskShowOpened, setTaskShowOpened] = useState(false)
    const [taskChange, setTaskChange] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [task, setTask] = useState(props.task);

    useEffect(() => {
        if (taskChange) {
            updateTask()
            setTaskChange(false)
        }
    }, [taskChange]);

    const handleChange = e => {
        setTask({...task, [e.target.name]:e.target.value})
    }

    const handleChecked = () => {
        setTask({...task, 'completed': !task.completed})
        setTaskChange(true)
    }

    const submitTask = e => {
        e.preventDefault()
        updateTask()
    }

    const updateTask = () => {
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.listableId}/lists/${props.listId}/tasks/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: {completed: task.completed}})
                })
        .then(response => response.json())
        .then(payload => {
            props.setListStatus(payload.list_status)
            setTask(payload.task)
            setEditShow(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderIcon = (boolean) => {
        if (boolean) {
            return (
                <ActionIcon 
                    color="green"
                    size={24}
                    onClick={handleChecked}
                >
                    <CircleCheck size={20} />
                </ActionIcon> 
            )
        }
        return (
            <ActionIcon 
                color="blue" 
                size={24} 
                onClick={handleChecked}
            >
                <Circle size={20} />
            </ActionIcon>
        )
    }

    return (
        <List.Item
            icon={renderIcon(task.completed)}
        >
            { taskShowOpened && 
                <TaskShow 
                    taskShowOpened={taskShowOpened}
                    setTaskShowOpened={setTaskShowOpened}
                    handleChange={handleChange}
                    handleChecked={handleChecked}
                    submitTask={submitTask}
                    setEditShow={setEditShow}
                    editShow={editShow}
                    id={task.id}
                    completed={task.completed}
                    setReloadLists={props.setReloadLists}
                    setTasks={props.setTasks}
                    tasks={props.tasks}
                    setTaskChange={setTaskChange}
                    listable={props.listable}
                    listableId={props.listableId}
                    listId={props.listId}
                />
            }
            <Box 
                style={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }
                }
            >
                <Text 
                    color="gray"
                    component="a"
                    sx={(theme) => ({
                        '&:hover': {
                        color: theme.colors.blue[5],
                        cursor: 'pointer'
                        },
                    })}
                    onClick={() => setTaskShowOpened(true)}
                >
                    {task.content}
                </Text>
            </Box>
        </List.Item>
    )
}