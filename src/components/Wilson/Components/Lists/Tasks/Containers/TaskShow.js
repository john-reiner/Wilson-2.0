import React, {useState, useEffect} from 'react'
import { Button, Drawer, Group, Switch, Stack, Title, TextInput, Box, ActionIcon, Divider, Paper, Text } from '@mantine/core';
import { ArrowBackUp, Edit, Trash } from 'tabler-icons-react';
import TaskInfo from './TaskInfo';
import EditTask from './EditTask';

export default function TaskShow(props) {

    const [task, setTask] = useState({});
    const [edit, setEdit] = useState(false);
    const [DeleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

    useEffect(() => {
        fetchTask()
    }, []);

    console.log(task)

    const handleChange = e => setTask({...task, [e.target.name]: e.target.value})
    
    const fetchTask = () => {
        fetch(`http://localhost:3001/api/v2/tasks/${props.id}`, {
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
            onClose={() => props.setTaskShowOpened(false)}
            opened={props.taskShowOpened}
            title={task.content}
            padding="md"
            size="md"
            position="right" 
        >
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
                        // onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash size={16} />
                    </ActionIcon>                    
                </Box>
            </Box>
            <Divider my="xl" />

                {renderContent(edit)}

            {/* <Stack>
                    {
                        props.editShow ? 
                            <form
                                onSubmit={props.submitTask}
                                style={
                                    {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }
                                }
                            
                            >
                                <TextInput
                                    // placeholder={props.content}
                                    name="content"
                                    value={props.content}
                                    onChange={props.handleChange}
                                    required
                                />
                                <ActionIcon
                                    variant="outline"
                                    color="green"
                                    type="submit"
                                    
                                >
                                    <ArrowRight />
                                </ActionIcon>
                            </form>
                        :
                            <Title
                                order={3}
                            >
                                {props.content}
                            </Title>
                    }

                    <Group
                        position="apart"
                    >
                        <Button
                            variant='outline'
                            color='gray'
                            onClick={() => props.setEditShow(!props.editShow)}
                            >
                            Edit
                        </Button>
                        <Button 
                            variant="outline" 
                            color="red"
                            onClick={() => setDeleteConfirmationShow(true)}
                        >
                            Delete
                        </Button>
                    </Group>
            </Stack> */}
        </Drawer>

    )
}
