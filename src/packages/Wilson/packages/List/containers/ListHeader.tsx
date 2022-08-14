import React from 'react'

import { 
    ListType
} from '../listTypes';

import { Box }  from '@mantine/core';

import ListTitle from './ListHeader/ListTitle';
import StatusContainer from './StatusContainer';
import IconsContainer from './IconsContainer';

interface ListHeaderProps {
    list: ListType
    listStatus: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    edit: boolean
    handleEditChange: () => void
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    id: string | number
    route: string
    setFetchList: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListHeader({
    list,
    listStatus,
    handleChange,
    edit,
    handleEditChange,
    setDeleteModalOpen,
    id,
    route,
    setFetchList,
    setEdit
}: ListHeaderProps) {

    return (
        <Box
            style={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }
                }
            >
            <StatusContainer 
                status={listStatus}
                // handleListComplete={handleListComplete}
            />
            <ListTitle
                edit={edit}
                title={list.title}
                handleChange={handleChange}
                id={id}
                route={route}
                setFetchList={setFetchList}
                setEdit={setEdit}
            />
            <IconsContainer
                handleEditChange={handleEditChange}
                setDeleteModalOpen={setDeleteModalOpen}
            />
        </Box>
    )
}
