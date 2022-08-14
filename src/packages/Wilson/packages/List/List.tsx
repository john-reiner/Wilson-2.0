import React, {useState, useEffect} from 'react'

import { 
    ListsComponentsInterface,
    ListType
} from './listTypes';

import { Divider, Paper } from '@mantine/core';

import NewTask from '../Tasks/components/NewTask'
import DeleteConfirmation from '../global/DeleteModalConfirmation';
import ListHeader from './containers/ListHeader';
import Tasks from '../Tasks/Tasks';
import useGETList from './api/useGETList';



interface ListProps {
    listable: "projects" | "features" 
    projectId: number
    featureId?: number
    id: number | undefined
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
    route: string
}

export default function List({
    listable,
    projectId,
    featureId,
    id,
    setContentTitle,
    route 
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
    const [fetchList, setFetchList] = useState(true);

    const handleEditChange = () => setEdit(!edit)

    useEffect(() => {
        if (fetchList) {
            fetchListPayload(route, id)
            setFetchList(false)
        }
        // if (resetList) {
        //     fetchList(route, id)
        //     setResetList(false)
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchList]);

    // const {data: list, loading, errors} =  useGETList(`${route}${id}`)

    const fetchListPayload = (
        route: string, 
        id: number | undefined
        ) => {
        console.log("fetching")
        fetch(`${route}${id}`, {
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
    console.log(`${route}${list.id}/tasks`)

    const renderNewTask = (status: string) => {
        if (!(status === 'completed')) {
            return (
                <NewTask
                    listId={list.id}
                    route={`${route}${list.id}/tasks`}
                    setFetchList={setFetchList}
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
                    route={`${route}${id}`}
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
                    handleChange={handleChange}
                    edit={edit}
                    handleEditChange={handleEditChange}
                    setDeleteModalOpen={setDeleteModalOpen}
                    id={list.id}
                    route={route}
                    setFetchList={setFetchList}
                    setEdit={setEdit}
                />
                <Divider my="xs" />
                {renderNewTask(list.status)}
                <Tasks
                    listId={id}
                    listable={listable}
                    // listableId={listableId}
                    tasks={list.tasks}
                    listStatus={listStatus}
                    setListStatus={setListStatus}

                />
            </Paper>
        </div>
    )
}
