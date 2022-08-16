import React, {useState, useEffect} from 'react'

import { 
    ListsComponentsInterface,
    ListType
} from './listTypes';

import { Divider, Paper } from '@mantine/core';

import DeleteConfirmation from '../global/DeleteModalConfirmation';
import ListHeader from './containers/ListHeader';
import Tasks from '../Tasks/Tasks';

interface ListProps {
    id: number | undefined
    setContentTitle: React.Dispatch<React.SetStateAction<keyof ListsComponentsInterface>>
    route: string
}

export default function List({
    id,
    setContentTitle,
    route 
}: ListProps) {

    // single source of truth for list and tasks
    const [list, setList] = useState<ListType>({
        id: "",
        title: "",
        status: "",
        author: "",
        tasks: []
    });
    const [edit, setEdit] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [fetchList, setFetchList] = useState(true);

    const handleEditChange = () => setEdit(!edit)

    useEffect(() => {
        if (fetchList) {
            fetchListPayload(route, id)
            setFetchList(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchList]);

    const handleListStatusToggled = () => setFetchList(true)

    const fetchListPayload = (
        route: string, 
        id: number | undefined
        ) => {
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
                    handleListStatusToggled={handleListStatusToggled}
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
                <Tasks
                    listId={id}
                    setList={setList}
                    list={list}
                    route={route}
                />
            </Paper>
        </div>
    )
}
