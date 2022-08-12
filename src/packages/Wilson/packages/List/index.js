import React, {useState, useEffect} from 'react'
import { Divider, Paper } from '@mantine/core';

import NewTask from '../Tasks/components/NewTask'
import DeleteConfirmation from '../global/DeleteModalConfirmation';
import ListHeaderContainer from './containers/ListHeaderContainer';
import Tasks from '../Tasks';

export default function ListContainer(props) {

    const [list, setList] = useState({});
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [listStatus, setListStatus] = useState("");
    const [resetList, setResetList] = useState(false);

    console.log(list)

    useEffect(() => {
        fetchList()
        if (resetList) {
            fetchList()
            setResetList(false)
        }
    }, [props.id, resetList]);



    const fetchList = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/lists/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setList(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = e => setList({...list, [e.target.name]: e.target.value})

    // const updateList = (attribute) => {
    //     fetch(`http://localhost:3001/api/v2/${props.listable}/${props.listableId}/lists/${list.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //             },
    //             body: JSON.stringify({list: attribute})
    //             })
    //     .then(response => response.json())
    //     .then(payload => {
    //         if (payload.status === "updated") {
    //             setEdit(false)
    //             setTasks(payload.tasks)
    //             setList(payload.list)
    //             setListStatus(payload.list.status)
    //         }
    //     })
    //     .catch(errors => {
    //         console.error(errors)
    //     })
    // }

    const handleDeleteSuccess = () => {
        props.setContentTitle('listSelectionContainer')
    }

    // const handleListComplete = () => {
    //     if (listStatus === "ready") {
    //         setListStatus("completed")
    //         updateList({status: "completed" })
    //     } else {
    //         setListStatus("ready")
    //         setList({...list, "status": "ready"})
    //         updateList({status: "ready"})
    //     }
    // }

    const renderNewTask = (status) => {
        if (!(status === 'completed')) {
            return (
                <NewTask
                    listId={list.id}
                    disabled={props.disabled}
                    setTasks={setTasks}
                    tasks={tasks}
                    listable={props.listable}
                    listableId={props.listableId}
                />                
            )
        }
    }

    return (
        <div>
            {deleteModalOpen && 
                <DeleteConfirmation
                    route={`${props.listable}/${props.listableId}/lists/${list.id}`}
                    successFunction={handleDeleteSuccess}
                    opened={deleteModalOpen}
                    setOpened={setDeleteModalOpen}
                    item="list"
                />
            
            }
            <Paper shadow="md" p="xs" withBorder>
                <ListHeaderContainer 
                    list={{...list}}
                    listStatus={list.status}
                    // handleListComplete={handleListComplete}
                    // updateList={updateList}
                    handleChange={handleChange}
                    edit={edit}
                    setEdit={setEdit}
                    setDeleteModalOpen={setDeleteModalOpen}
                />
                <Divider my="xs" />
                {renderNewTask(list.status)}
                <Tasks
                    listId={props.id}
                    listable={props.listable}
                    listableId={props.listableId}
                    tasks={list.tasks}
                    setResetList={setResetList}
                    listStatus={listStatus}
                    setListStatus={setListStatus}
                />
            </Paper>
        </div>
    )
}
