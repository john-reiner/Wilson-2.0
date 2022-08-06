import React from 'react'
import { Button, Space, Checkbox, Paper } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

import { CheckboxGroup } from '@mantine/core';

export default function FeaturesNav(props) {

    const controlCounts = (category, value) => {
        if (category && category[value] !== undefined) {
            return category[value]
        } else {
            return 0
        }
    }

    return (
        <Paper
            shadow="md" 
            p="xs"
        >   
            <Space h="md" />
            <Button 
                leftIcon={<Plus size={14} />}
                onClick={() => props.setNewFeatureModalOpen(true)}
            >
                New Feature
            </Button>
            <Space h="md" />
            <CheckboxGroup 
                value={props.priorities} 
                onChange={props.setPriorities}
                orientation="vertical"
                label="Priority"
                spacing="sm"
            >
                <Checkbox value="high" label={`High (${controlCounts(props.counts.priorities, 'high')})`}/>
                <Checkbox value="medium" label={`Medium (${controlCounts(props.counts.priorities, 'medium')})`}/>
                <Checkbox value="low" label={`Low (${controlCounts(props.counts.priorities, 'low')})`}/>
            </CheckboxGroup>
            <Space h="md" />
            <CheckboxGroup 
                value={props.statuses} 
                onChange={props.setStatuses}
                orientation="vertical"
                label="Status"
                spacing="sm"
            >
                <Checkbox value="created" label={`Created (${controlCounts(props.counts.statuses, 'created')})`}/>
                <Checkbox value="paused" label={`Paused (${controlCounts(props.counts.statuses, 'paused')})`}/>
                <Checkbox value="working" label={`Working (${controlCounts(props.counts.statuses, 'working')})`}/>
                <Checkbox value="ready" label={`Ready to Complete (${controlCounts(props.counts.statuses, 'ready')})`}/>
                <Checkbox value="completed" label={`Completed (${controlCounts(props.counts.statuses, 'completed')})`}/>
            </CheckboxGroup>
        </Paper>
    )
}
