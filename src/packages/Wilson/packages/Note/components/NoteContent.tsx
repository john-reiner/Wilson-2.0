import React from 'react'
import { Paper, Text, Title, Divider, TypographyStylesProvider } from '@mantine/core';
import { NoteType } from '../../Notes/noteTypes';

interface NoteContentProps {
    note: NoteType
}


export default function NoteBody({
    note
}:NoteContentProps) {


    return (
        <Paper>
            <Title order={2}>{note.title}</Title>
            <Divider my="xs" />
            <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </TypographyStylesProvider>
        </Paper>
    )
}