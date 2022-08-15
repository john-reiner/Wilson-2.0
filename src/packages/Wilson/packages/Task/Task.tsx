import React, {useState, useEffect} from 'react'
import { Box, ActionIcon, Text, List} from '@mantine/core';
import { CircleCheck, Circle, Lock } from 'tabler-icons-react';
import TaskShow from './containers/TaskShow';
import { TaskType } from './taskTypes';
import { ListType } from '../List/listTypes';

interface TaskProps {
    task: TaskType
    listable: string
    listId: number | undefined
    route: string
    setList: React.Dispatch<React.SetStateAction<ListType>>
    list: ListType
    handleListStatusToggled: () => void
}

export default function Task({
    task,
    listable,
    listId,
    route,
    setList,
    list,
    handleListStatusToggled
}: TaskProps) {

    const [taskShowOpened, setTaskShowOpened] = useState(false)
    const [taskChange, setTaskChange] = useState(false);
    const [editShow, setEditShow] = useState(false);
    // const [task, setTask] = useState(props.task);
    const [completed, setCompleted] = useState(task.completed)

    // useEffect(() => {
    //     if (taskChange) {
    //         updateTask()
    //         setTaskChange(false)
    //     }
    // }, [taskChange]);

    // const handleChange = e => {
    //     setTask({...task, [e.target.name]:e.target.value})
    // }

    const handleChecked = () => {
        const taskCompletedState = !completed
        setCompleted(taskCompletedState)
        updateTaskCompleted(`${route}${listId}/tasks/${task.id}`, taskCompletedState)
    }

    const updateTaskCompleted = (
        route: string,
        taskCompletedState: boolean
    ) => {
            fetch(route, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                    },
                    body: JSON.stringify({task: {completed: taskCompletedState}})
                    })
            .then(response => response.json())
            .then(payload => {
                setList({...list, "status": payload.list_status})
            })
            .catch(errors => {
                console.error(errors)
            })
    }

    // const submitTask = e => {
    //     e.preventDefault()
    //     updateTask()
    // }

    // const updateTask = () => {
    //     fetch(`http://localhost:3001/api/v2/${listable}/${listableId}/lists/${listId}/tasks/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //             },
    //             body: JSON.stringify({task: {completed: task.completed}})
    //             })
    //     .then(response => response.json())
    //     .then(payload => {
    //         setListStatus(payload.list_status)
    //         setTask(payload.task)
    //         setEditShow(false)
    //     })
    //     .catch(errors => {
    //         console.error(errors)
    //     })
    // }

    const renderIcon = (
        completed : boolean, 
        status : string
        ) => {
        if (!(status === 'completed')) {
            if (completed) {
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
            <ActionIcon disabled>
                <Lock />
            </ActionIcon>
        )
    }



    return (
        <List.Item
            icon={renderIcon(completed, list.status)}
        >
            { taskShowOpened && 
                <TaskShow
                    taskShowOpened={taskShowOpened}
                    setTaskShowOpened={setTaskShowOpened}
                    route={route}
                    listId={listId}
                    id={task.id}
                    handleChecked={handleChecked}
                    completed={completed}
                    listStatus={list.status}
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
