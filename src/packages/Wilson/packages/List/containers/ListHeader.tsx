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
    updateList: (list: ListType) => void
}

export default function ListHeader({
    list,
    listStatus,
    handleChange,
    edit,
    handleEditChange,
    setDeleteModalOpen,
    updateList
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
                updateList={updateList}
            />
            <IconsContainer
                handleEditChange={handleEditChange}
                setDeleteModalOpen={setDeleteModalOpen}
            />
        </Box>
    )
}
