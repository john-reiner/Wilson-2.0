import React, { useState } from 'react'

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
    task: TaskType
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
    taskShowOpened: boolean
    setTaskShowOpened: React.Dispatch<React.SetStateAction<boolean>>
    route: string
    handleChecked: () => void
    listStatus: string
    completed: boolean
    id: number | undefined,
    handleTaskChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    setReloadTasks: React.Dispatch<React.SetStateAction<boolean>>
    
}

export default function TaskShow({
    task,
    setTask,
    taskShowOpened,
    setTaskShowOpened,
    route,
    handleChecked,
    listStatus,
    completed,
    id,
    handleTaskChange,
    setReloadTasks
}: TaskShowProps) {

    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        setTaskShowOpened(false)
        setReloadTasks(true)
    }

    const renderContent = (
        edit: boolean
    ) => {
        if (edit) {
            return (
                <EditTask 
                    task={{...task}}
                    handleTaskChange={handleTaskChange}
                    setEdit={setEdit}
                    setTask={setTask}
                    route={route}
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
                successFunction={handleDelete}
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
