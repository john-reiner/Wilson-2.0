import React from 'react'

import { Grid, Paper, Text } from '@mantine/core'

import StatusBadge from '../../../global/StatusBadge'

export default function ListLink(props) {
    
    return (
        <Grid.Col sm={6} lg={4} xl={3}>
            <Paper
                p="xs"
                withBorder
                style={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "100%"
                    }
                }
                onClick={() => props.handleListSelection(props.id)}
            >
                <Text 
                    align="center"
                >
                    {props.title}
                </Text>
                <StatusBadge
                    status={props.status}
                />
            </Paper>
        </Grid.Col>
    )
}
