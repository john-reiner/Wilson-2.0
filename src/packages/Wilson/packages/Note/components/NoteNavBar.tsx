import React from 'react'
import { ActionIcon, Divider, Box } from '@mantine/core';
import { Trash, Edit, ArrowBackUp } from 'tabler-icons-react';
import { NoteComponentsInterface } from '../../Notes/noteTypes';

interface NoteNavBarProps {
    setNoteComponentKey: React.Dispatch<React.SetStateAction<keyof NoteComponentsInterface>>
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    noteComponentKey: keyof NoteComponentsInterface
}

export default function NoteNavBar({
    setNoteComponentKey,
    setDeleteModal,
    noteComponentKey
}: NoteNavBarProps) {

    const renderEditIcon = (
        noteComponentKey: keyof NoteComponentsInterface
    ) => {
        if (noteComponentKey === "edit") {
            return (
                <ActionIcon 
                    size="xs"
                >
                    <ArrowBackUp 
                        onClick={() => setNoteComponentKey('content')}
                    />
                </ActionIcon>
            )
        }
        return (
            <ActionIcon 
                size="xs"
            >
                <Edit 
                    onClick={() => setNoteComponentKey('edit')}
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
                    onClick={() => setDeleteModal(true)}
                >
                    <Trash />
                </ActionIcon>
                { renderEditIcon(noteComponentKey)}
            </Box>
            <Divider my="xs" />
        </Box>
    )
}
