import React, { useState } from 'react'
import { Box, ActionIcon, Text, List} from '@mantine/core';
import { CircleCheck, Circle, Lock } from 'tabler-icons-react';
import TaskShow from './containers/TaskShow';
import { TaskType } from './taskTypes';
import { ListType } from '../List/listTypes';

interface TaskProps {
    taskProps: TaskType
    route: string
    setList: React.Dispatch<React.SetStateAction<ListType>>
    list: ListType
    setReloadTasks: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Task({
    taskProps,
    route,
    setList,
    list,
    setReloadTasks
}: TaskProps) {

    
    const [task, setTask] = useState<TaskType>(taskProps)
    const [taskShowOpened, setTaskShowOpened] = useState(false)

    const taskRoute = `${route}/${task.id}`

    const handleTaskChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => setTask({...task, [e.target.name]: e.target.value})

    const handleChecked = () => {
        const taskCompletedState = !task.completed
        setTask({...task, completed: taskCompletedState})
        updateTask(taskRoute, {...task, completed: taskCompletedState})
    }

    const updateTask = (
        route: string,
        task: object
    ) => {
        fetch(taskRoute, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: task})
                })
        .then(response => response.json())
        .then(payload => {
            setList({...list, "status": payload.list_status})
        })
        .catch(errors => {
            console.error(errors)
        })
    }

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
            icon={renderIcon(task.completed, list.status)}
        >
            { taskShowOpened && 
                <TaskShow
                    task={{...task}}
                    setTask={setTask}
                    taskShowOpened={taskShowOpened}
                    setTaskShowOpened={setTaskShowOpened}
                    route={taskRoute}
                    id={task.id}
                    handleChecked={handleChecked}
                    completed={task.completed}
                    listStatus={list.status}
                    handleTaskChange={handleTaskChange}
                    setReloadTasks={setReloadTasks}
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
