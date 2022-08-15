import React, {useState, useEffect} from 'react'

import { 
        Drawer,
        Switch, 
        Box, 
        ActionIcon, 
        Divider 
    } from '@mantine/core';
import { ArrowBackUp, Edit, Trash } from 'tabler-icons-react';

import TaskInfo from '../components/TaskInfo';
import EditTask from '../components/EditTask';
import DeleteModalConfirmation from '../../global/DeleteModalConfirmation';
import { TaskType } from '../taskTypes';

interface TaskShowProps {
    taskShowOpened: boolean
    setTaskShowOpened: React.Dispatch<React.SetStateAction<boolean>>
    route: string
    handleChecked: () => void
    listStatus: string
    completed: boolean
    listId: number | undefined
    id: number | undefined
}

export default function TaskShow({
    taskShowOpened,
    setTaskShowOpened,
    route,
    handleChecked,
    listStatus,
    completed,
    listId,
    id
}: TaskShowProps) {

    const [task, setTask] = useState<TaskType>({
        content: "",
        completed: false,
        description: ""
    });
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchTask(route)
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => setTask({...task, [e.target.name]: e.target.value})

    const handleListStatusToggled = () => setTask

    // const handleDelete = () => {
    //     setTaskShowOpened(false)
    //     setResetList(true)
    // }

    const fetchTask = (
        route: string
    ) => {
        fetch(`${route}${listId}/tasks/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setTask(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderContent = (
        edit: boolean
    ) => {
        if (edit) {
            return (
                <EditTask 
                    task={{...task}}
                    handleChange={handleChange}
                    setEdit={setEdit}
                    setTask={setTask}
                    route={`${route}${listId}/tasks/${id}`}
                    // setTaskChange={setTaskChange}
                    // listable={listable}
                    // listId={listId}
                    // listableId={listableId}
                />
            )
        }
        return (
            <TaskInfo 
                task={{...task}}
            />            
        )
    }

    return (
        <Drawer
            onClose={() => setTaskShowOpened(false)}
            opened={taskShowOpened}
            title={task.content}
            padding="md"
            size="xl"
            position="right" 
        >
            <DeleteModalConfirmation
                route={route}
                item="task"
                opened={deleteModalOpen}
                setOpened={setDeleteModalOpen}
                // successFunction={handleDelete}
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
                <Switch
                    label="Completed"
                    checked={completed}
                    onChange={handleChecked}
                    name="completed"
                    // value={`${completed}`}
                    disabled={listStatus === "completed"}
                >
                </Switch>
                <Box 
                        style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                
                            }
                        }
                    >
                    <ActionIcon 
                        variant="outline"
                        onClick={() => setEdit(!edit)}
                        style={{marginLeft: ".5em"}}
                    >
                        {edit ? <ArrowBackUp size={16} /> : <Edit size={16} />}
                    </ActionIcon>
                    <ActionIcon 
                        variant="outline" 
                        color="red"
                        style={{marginLeft: ".5em"}}
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash size={16} />
                    </ActionIcon>                    
                </Box>
            </Box>
            <Divider my="xl" />

                {renderContent(edit)}

        </Drawer>

    )
}
