import React from 'react'
import { Paper } from '@mantine/core';

import NoteContent from '../Components/NoteContent'
import NoteForm from '../Components/NoteForm'


export default function NoteBody(props) {

    const renderContent = editFlag => {
        if (editFlag) {
            return (
                <NoteForm
                    handleSubmit={props.handleSubmit}
                    handleChange={props.handleChange}
                    content={props.content}
                />
            )
        }
        return (
            <NoteContent 
                content={props.content}
            />
        )
    }

    return (
        <Paper 
            p="xs"
        >
            {renderContent(props.edit)}
        </Paper>
    )
}
