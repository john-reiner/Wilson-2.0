import React, {useState} from 'react'
import { Grid, Divider, Paper, List } from '@mantine/core';
import Task from '../Tasks/Task';
import NewTask from '../Tasks/NewTask';
import DeleteConfirmation from '../../../Containers/DeleteModalConfirmation';

import ListTitleContainer from './ListTitleContainer';

export default function ListContainer(props) {

    const [list, setList] = useState(props.list);
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [tasks, setTasks] = useState(list.tasks);
    const [status, setStatus] = useState(props.list.status);

    const handleChange = e => setList({...list, [e.target.name]: e.target.value})

    console.log(list)

    const updateList = (attribute) => {
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.listableId}/lists/${list.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: attribute})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "updated") {
                setEdit(false)
                props.setReloadLists(true)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleDeleteSuccess = () => {
        props.setReloadLists(true)
    }

    const handleListComplete = () => {
        if (list.status === "ready") {
            setStatus("completed")
            setList({...list, "status": "completed"})
            updateList({status: "completed" })
        } else {
            console.log("clicked")
            setStatus("ready")
            setList({...list, "status": "ready"})
            updateList({status: "ready"})
        }
    }

    // const renderTasks = () => {
    //     if (tasks) {
    //         return tasks.map(task => {
    //             return <Task
    //                         task={{...task}}
    //                         key={task.id}
    //                         setReloadLists={props.setReloadLists}
    //                         setTasks={setTasks}
    //                         tasks={tasks}
    //                         setStatus={setStatus}
    //                         listStatus={status}
    //                     />
    //         })
    //     }
    // }

    return (
        <Grid.Col>
            <DeleteConfirmation
                route={`${props.listable}/${props.listableId}/lists/${props.list.id}`}
                successFunction={handleDeleteSuccess}
                opened={deleteModalOpen}
                setOpened={setDeleteModalOpen}
                item="list"
            />
            <Paper shadow="md" p="xs" withBorder>
                <ListTitleContainer 
                    list={{...list}}
                    listStatus={status}
                    handleListComplete={handleListComplete}
                    updateList={updateList}
                    handleChange={handleChange}
                    edit={edit}
                    setEdit={setEdit}
                    setDeleteModalOpen={setDeleteModalOpen}
                />
                <Divider my="xs" />
                {status !== "completed" && 
                    <NewTask
                        id={props.list.id}
                        // setTasks={setTasks}
                        // tasks={tasks}
                    /> 
                }
                <List
                    spacing="xs"
                    size="sm"
                    center
                    withPadding
                >
                    {/* {renderTasks()} */}
                </List>
            </Paper>
        </Grid.Col>
    )
}
