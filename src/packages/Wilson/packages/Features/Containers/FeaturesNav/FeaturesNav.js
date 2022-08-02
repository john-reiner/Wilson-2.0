import React, {useState} from 'react'
import { Button, Space, Checkbox, Title, Paper } from '@mantine/core';
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
                value={props.priority} 
                onChange={props.setPriority}
                orientation="vertical"
                label="Priority"
                spacing="sm"
            >
                <Checkbox value="high" label={`High (${controlCounts(props.counts.priority, 'high')})`}/>
                <Checkbox value="medium" label={`Medium (${controlCounts(props.counts.priority, 'medium')})`}/>
                <Checkbox value="low" label={`Low (${controlCounts(props.counts.priority, 'low')})`}/>
            </CheckboxGroup>
            <Space h="md" />
            <CheckboxGroup 
                value={props.status} 
                onChange={props.setStatus}
                orientation="vertical"
                label="Status"
                spacing="sm"
            >
                <Checkbox value="created" label={`Created (${controlCounts(props.counts.status, 'created')})`}/>
                <Checkbox value="paused" label={`Paused (${controlCounts(props.counts.status, 'paused')})`}/>
                <Checkbox value="working" label={`Working (${controlCounts(props.counts.status, 'working')})`}/>
                <Checkbox value="ready" label={`Ready to Complete (${controlCounts(props.counts.status, 'ready')})`}/>
                <Checkbox value="completed" label={`Completed (${controlCounts(props.counts.status, 'completed')})`}/>
            </CheckboxGroup>
        </Paper>
    )
}
