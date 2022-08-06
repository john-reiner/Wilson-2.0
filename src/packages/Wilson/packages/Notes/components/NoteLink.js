import { Grid, Paper } from '@mantine/core'
import React from 'react'

export default function NoteLink(props) {
    return (
        <Paper
            p="xs"
            radius={0}
            withBorder
            style={
                {
                    cursor: "pointer",
                    borderLeft: "0",
                    borderRight: "0",
                    borderBottom: "0"
                }
            }
        >
            <Grid>
                <Grid.Col xs={8}>Title</Grid.Col>
                <Grid.Col xs={2}>Author</Grid.Col>
                <Grid.Col xs={2}>Modified</Grid.Col>
            </Grid>
        </Paper>
    )
}
