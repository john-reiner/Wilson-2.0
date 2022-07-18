import { Paper, Text, Title, Divider } from '@mantine/core'
import React from 'react'

export default function FeatureDescriptionContainer(props) {
    return (
        <Paper
            shadow="xs" 
            p="md"
            withBorder
            style = {
                {
                    marginTop: "1em"
                }
            }
        >
        <Title order={3}>Description</Title>
        <Divider my="xs" />
        <Text>{props.description}</Text>
        </Paper>
    )
}
