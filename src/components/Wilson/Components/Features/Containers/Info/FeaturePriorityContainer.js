import { Paper, Box, Title, RadioGroup, Radio } from '@mantine/core'
import React from 'react'

export default function FeaturePriorityContainer(props) {

    const handlePriorityChange = (e) => {
        props.setFeature({...props.feature, 'priority': e})
        props.updateFeature({priority: e})
        props.setFetchAgainFlag(true)
    }

    return (
        <Paper
            shadow="xs" 
            p="md"
            withBorder
        >
            <Box
                style={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "Center"
                    }
                }
            >
                <Title order={3}>Priority</Title>
                <RadioGroup
                label="Set the priority level for this feature"
                value={props.priority}
                onChange={handlePriorityChange}
                // description="This is anonymous"
                // required
                >
                    <Radio value="low" label="Low" />
                    <Radio value="medium" label="Medium" />
                    <Radio value="high" label="High" />
                </RadioGroup>
            </Box>
        </Paper>
    )
}
