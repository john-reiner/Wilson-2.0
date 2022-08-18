import React from 'react'

import { Paper, Text, Title, Divider } from '@mantine/core'

interface FeatureDescriptionProps {
    description: string
}

export default function FeatureDescriptionContainer({
    description
}: FeatureDescriptionProps) {

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
        <Text>{description}</Text>
        </Paper>
    )
}
