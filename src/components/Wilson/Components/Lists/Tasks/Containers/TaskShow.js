import React, {useState, useEffect} from 'react'
import { 
        Drawer,
        Switch, 
        Box, 
        ActionIcon, 
        Divider 
        } from '@mantine/core';
import { ArrowBackUp, Edit, Trash } from 'tabler-icons-react';
import TaskInfo from './TaskInfo';
import EditTask from './EditTask';
import DeleteModalConfirmation from '../../../../Containers/DeleteModalConfirmation';

export default function TaskShow(props) {

    const [task, setTask] = useState({});
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchTask()
    }, []);

    const handleChange = e => setTask({...task, [e.target.name]: e.target.value})

    const handleDelete = () => {
        props.setTaskShowOpened(false)
        // let newTaskList = props.tasks.filter(deletedTask => deletedTask.id !== task.id)
        // props.setTasks(newTaskList)
        props.setResetList(true)
    }
    
    const fetchTask = () => {
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.listableId}/lists/${props.listId}/tasks/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setTask(payload.task)
                
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderContent = edit => {
        if (edit) {
            return (
                <EditTask 
                    task={{...task}}
                    handleChange={handleChange}
                    setEdit={setEdit}
                    setTask={setTask}
                    setTaskChange={props.setTaskChange}
                    listable={props.listable}
                    listId={props.listId}
                    listableId={props.listableId}
                />
            )
        }
        return (
            <TaskInfo 
                task={{...task}}
            />            
        )
    }

    console.log(props.listStatus === "completed", props.listStatus)

    return (
        <Drawer
            onClose={() => props.setTaskShowOpened(false)}
            opened={props.taskShowOpened}
            title={task.content}
            padding="md"
            size="md"
            position="right" 
        >
            <DeleteModalConfirmation
                route={`${props.listable}/${props.listableId}/lists/${props.listId}/tasks/${props.id}`}
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
                    checked={props.completed}
                    onChange={props.handleChecked}
                    name="completed"
                    value={props.completed}
                    disabled={props.listStatus === "completed"}
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
