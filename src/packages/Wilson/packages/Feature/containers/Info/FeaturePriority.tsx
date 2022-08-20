import React from 'react'
import { Paper, Radio } from '@mantine/core'
import { FeatureType } from '../../../Features/featureTypes'

interface FeaturePriorityProps {
    priority: string
    setFeature: React.Dispatch<React.SetStateAction<FeatureType>>
    feature: FeatureType
    route: string

}

export default function FeaturePriority({
    priority,
    setFeature,
    feature,
    route
}: FeaturePriorityProps) {

    const handlePriorityChange = (
        e: string
    ) => {
        setFeature({...feature, 'priority': e})
        updateFeature({priority: e})
    }

        const updateFeature = (
        feature: object
    ) => {
        fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: feature})
                })
        .then(response => response.json())
        .then(payload => {
            // if (payload.status === "ok") {
            //     setFeatureContent("info")
            // }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Paper
            shadow="xs" 
            p="md"
            withBorder
        >
            <Radio.Group
            label="Priority Level"
            value={priority}
            onChange={handlePriorityChange}
            description="Set the priority level for this feature"
            >
                <Radio value="low" label="Low" />
                <Radio value="medium" label="Medium" />
                <Radio value="high" label="High" />
            </Radio.Group>
        </Paper>
    )
}
