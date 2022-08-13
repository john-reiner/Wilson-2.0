import React from 'react'

import { Box, ActionIcon }  from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

interface IconsContainerProps {
    handleEditChange: () => void
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IconsContainer({
    handleEditChange,
    setDeleteModalOpen
}: IconsContainerProps) {
    
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
                onClick={handleEditChange}
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
    )
}
