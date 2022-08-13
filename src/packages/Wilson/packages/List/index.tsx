import React, {useState, useEffect} from 'react'

import { 
    ListsComponentsInterface,
    ListType
} from './listTypes';

import { Divider, Paper } from '@mantine/core';

import NewTask from '../Tasks/components/NewTask'
import DeleteConfirmation from '../global/DeleteModalConfirmation';
import ListHeader from './containers/ListHeader';
import Tasks from '../Tasks';



interface ListProps {
    listable: "projects" | "features" 
    projectId: number
    featureId?: number
    id: number | undefined
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
}

export default function List({
    listable,
    projectId,
    featureId,
    id,
    setContentTitle
}: ListProps) {

    const [list, setList] = useState<ListType>({
        id: "",
        title: "",
        status: "",
        author: "",
        tasks: []
    });
    // const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [listStatus, setListStatus] = useState("");
    const [resetList, setResetList] = useState(false);

    const handleEditChange = () => setEdit(!edit)

    useEffect(() => {
        fetchList()
        if (resetList) {
            fetchList()
            setResetList(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, resetList]);

    const fetchList = () => {
        fetch(`http://localhost:3001/api/v2/projects/${projectId}/lists/${id}`, {
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setList({...list, [e.target.name]: e.target.value})

    const updateList = (list: ListType) => {
        let route = `http://localhost:3001/api/v2/projects/${projectId}/lists/`
        if (listable === "features") {
            route = `http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}/lists/${list.id}`
        }
        fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: list})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "updated") {
                setEdit(false)
                setList(payload.list)
                setListStatus(payload.list.status)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleDeleteSuccess = () => {
        setContentTitle('all')
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

    const renderNewTask = (status: string) => {
        if (!(status === 'completed')) {
            return (
                <NewTask
                    listId={list.id}
                    // disabled={disabled}
                    // setLists={setTasks}
                    // list={tasks}
                    // listable={listable}
                    // listableId={listableId}
                />                
            )
        }
    }

    return (
        <div>
            {deleteModalOpen && 
                <DeleteConfirmation
                    // route={`${listable}/${listableId}/lists/${list.id}`}
                    successFunction={handleDeleteSuccess}
                    opened={deleteModalOpen}
                    setOpened={setDeleteModalOpen}
                    item="list"
                />
            
            }
            <Paper shadow="md" p="xs" withBorder>
                <ListHeader 
                    list={{...list}}
                    listStatus={list.status}
                    // handleListComplete={handleListComplete}
                    updateList={updateList}
                    handleChange={handleChange}
                    edit={edit}
                    handleEditChange={handleEditChange}
                    setDeleteModalOpen={setDeleteModalOpen}
                />
                <Divider my="xs" />
                {renderNewTask(list.status)}
                <Tasks
                    listId={id}
                    listable={listable}
                    // listableId={listableId}
                    tasks={list.tasks}
                    setResetList={setResetList}
                    listStatus={listStatus}
                    setListStatus={setListStatus}
                />
            </Paper>
        </div>
    )
}
