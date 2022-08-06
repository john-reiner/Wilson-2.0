import React from 'react'
import { ActionIcon, Divider, Box } from '@mantine/core';
import { Trash, Edit, ArrowBackUp } from 'tabler-icons-react';

export default function NoteNavBar(props) {

    const renderEditIcon = (edit) => {
        if (edit) {
            return (
                <ActionIcon 
                    size="xs"
                >
                    <ArrowBackUp 
                        onClick={() => props.setEdit(false)}
                    />
                </ActionIcon>
            )
        }
        return (
            <ActionIcon 
                size="xs"
            >
                <Edit 
                    onClick={() => props.setOptionsToShow('edit')}
                />
            </ActionIcon>
        )
    }

    return (
        <Box>
            <Box
                sx={(theme) => ({
                    padding: theme.spacing.xs,
                    paddingBottom: 0,
                    borderRadius: theme.radius.xs,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                })}
            >
                <ActionIcon 
                    color='red'
                    size="xs"
                    onClick={() => props.setDeleteModal(true)}
                >
                    <Trash />
                </ActionIcon>
                { renderEditIcon(props.edit)}
            </Box>
            <Divider my="xs" />
        </Box>
    )
}
