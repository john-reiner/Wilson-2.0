import React from 'react'
import { Paper, Text } from '@mantine/core'
import ListBadge from '../../Components/ListHeader/ListBadge'


export default function ListLink(props) {
    return (
        <Paper
            p="xs"
            withBorder
            style={
                {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: ".5em",
                    width: "80%"

                }
            }
            onClick={() => props.handleListSelection(props.id)}
        >
            <Text 
                align="center"
            >
                {props.title}
            </Text>
            <ListBadge
                status={props.status}
            />
        </Paper>
    )
}
