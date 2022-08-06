import React from 'react'
import { Paper, Text, Title, Divider, TypographyStylesProvider } from '@mantine/core';


export default function NoteBody(props) {


    return (
        <Paper>
            <Title order={2}>{props.note.title}</Title>
            <Divider my="xs" />
            <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: props.note.content }} />
            </TypographyStylesProvider>
        </Paper>
    )
}