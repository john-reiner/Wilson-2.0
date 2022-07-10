import React, {useState} from 'react'
import { Grid, Divider, Paper, List, Title, Text, Box, Group, ActionIcon, TextInput } from '@mantine/core';
import { Trash, Edit, ArrowBarRight } from 'tabler-icons-react';
import Task from '../Tasks/Task';
import NewTask from '../Tasks/NewTask';
import DeleteConfirmation from '../../../Containers/DeleteModalConfirmation';

export default function ListContainer(props) {

    const [edit, setEdit] = useState(false);
    const [list, setList] = useState(props.list);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tasks, setTasks] = useState(list.tasks);

    console.log(tasks)

    const handleChange = e => setList({...list, [e.target.name]: e.target.value})

    const handleDeleteSuccess = () => {
        props.setReloadLists(true)
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.listableId}/lists/${list.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: {title: list.title }})
                })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "updated") {
                setEdit(false)
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
                            task={{...task}}
                            key={task.id}
                            setReloadLists={props.setReloadLists}
                            setTasks={setTasks}
                            tasks={tasks}
                        />
            })
        }
    }

    const renderTitle = edit => {
        if (edit) {
            return (
                <form
                    style={{ width: "90%" }}
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        // placeholder={props.title}
                        radius="xs"
                        required
                        name="title"
                        value={list.title}
                        onChange={handleChange}
                        rightSection={
                            <ActionIcon type="submit" color={"green"}>
                                <ArrowBarRight />
                            </ActionIcon>
                        }
                    />                    
                </form>
            )
        }
        return (
            <Title order={4}>
                <Text lineClamp={1}>
                    {list.title}
                </Text>
            </Title>
        )
    }
    
    return (
        <Grid.Col>
            <DeleteConfirmation
                route={`${props.listable}/${props.listableId}/lists/${list.id}`}
                successFunction={handleDeleteSuccess}
                opened={deleteModalOpen}
                setOpened={setDeleteModalOpen}
                item="list"
            />
            <Paper shadow="md" p="xs" withBorder>
                <Box
                    style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }
                    }
                >
                    {renderTitle(edit)}
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
                            <Edit size={16} />
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
                <Divider my="xs" />
                <NewTask 
                    id={list.id}
                    setTasks={setTasks}
                    tasks={tasks}
                    // handleTaskChange={handleTaskChange}
                    // handleSubmit={handleSubmit}
                    // task={task}
                />
                <List
                    spacing="xs"
                    size="sm"
                    center
                    withPadding
                >
                    {renderTasks()}
                </List>
            </Paper>
        </Grid.Col>
    )
}
