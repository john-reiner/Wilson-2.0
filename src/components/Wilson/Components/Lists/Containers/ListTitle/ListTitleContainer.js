import React from 'react'
import { Box }  from '@mantine/core';



import ListTitle from '../../Components/ListTitle';
import StatusContainer from './StatusContainer';
import IconsContainer from './IconsContainer';

export default function ListTitleContainer(props) {

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
                status={props.listStatus}
                handleListComplete={props.handleListComplete}
            />
            <ListTitle
                edit={props.edit}
                title={props.list.title}
                handleChange={props.handleChange}
                updateList={props.updateList}
            />
            <IconsContainer
                setEdit={props.setEdit}
                setDeleteModalOpen={props.setDeleteModalOpen}
            />
        </Box>
    )
}
