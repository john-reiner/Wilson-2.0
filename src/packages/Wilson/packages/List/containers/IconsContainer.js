import React from 'react'

import { Box, ActionIcon }  from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

export default function IconsContainer(props) {
    
    return (
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
                onClick={() => props.setEdit(!props.edit)}
                style={{marginLeft: ".5em"}}
            >
                <Edit size={16} />
            </ActionIcon>
            <ActionIcon 
                variant="outline" 
                color="red"
                style={{marginLeft: ".5em"}}
                onClick={() => props.setDeleteModalOpen(true)}
            >
                <Trash size={16} />
            </ActionIcon>
        </Box>
    )
}
