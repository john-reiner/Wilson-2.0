import React from 'react'
import { Group, ActionIcon } from '@mantine/core';
import { Trash, Edit, ArrowBackUp } from 'tabler-icons-react';

export default function NoteNavBar(props) {
    return (
        <Group position="apart">
            <ActionIcon 
                color='red'
                size="xs"
                onClick={props.deleteNote}
            >
                <Trash />
            </ActionIcon>
            {   !props.editProjectFlag ?
                    <ActionIcon 
                        size="xs"
                    >
                        <Edit 
                            onClick={() => props.setEditProjectFlag(true)}
                        />
                    </ActionIcon>
                :
                    <ActionIcon 
                        size="xs"
                    >
                        <ArrowBackUp 
                            onClick={() => props.setEditProjectFlag(false)}
                        />
                    </ActionIcon>
            }
        </Group>
    )
}
