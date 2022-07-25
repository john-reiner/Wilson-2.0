import React from 'react'
import { Paper, RadioGroup, Radio } from '@mantine/core'

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
            <RadioGroup
            label="Priority Level"
            value={props.priority}
            onChange={handlePriorityChange}
            description="Set the priority level for this feature"
            // required
            >
                <Radio value="low" label="Low" />
                <Radio value="medium" label="Medium" />
                <Radio value="high" label="High" />
            </RadioGroup>
        </Paper>
    )
}
