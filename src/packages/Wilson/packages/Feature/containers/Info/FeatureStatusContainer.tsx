import React, { useState } from 'react'

import { 
    Paper, 
    Title, 
    Box, 
    Divider, 
    Timeline, 
    Text, 
    Select, 
    ActionIcon, 
    Group 
    } from '@mantine/core'

import { 
    GitBranch, 
    GitPullRequest, 
    GitCommit, 
    MessageDots, 
    PlayerPlay, 
    PlayerPause 
    } from 'tabler-icons-react';
    
import StatusBadge from '../../../global/StatusBadge'
import { FeatureType } from '../../../Features/featureTypes';

interface FeatureStatusContainerProps {
    status: string
    setFeature: React.Dispatch<React.SetStateAction<FeatureType>>
    feature: FeatureType
    route: string
    // updateFeature: (feature: FeatureType) => void
}

export default function FeatureStatusContainer({
    status,
    setFeature,
    feature,
    route
    // updateFeature
}: FeatureStatusContainerProps) {

    const statusData = [        
        { value: 'created', label: 'Created' },
        { value: 'working', label: 'Working' },
        { value: 'ready', label: 'Ready for Review' },
        { value: 'completed', label: 'Completed' },
    ]

    const handleStatusChange = (
        e: string
    ) => {
        setFeature({...feature, 'status': e})
        updateFeature({"status": e})
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

    const handlePause = () => {
        if (status !== 'paused') {
            setFeature({...feature, 'status': 'paused'})
            updateFeature({status: 'paused'})
        } else {
            setFeature({...feature, 'status': 'working'})
            updateFeature({status: 'working'})
        }
    }

    const setActive= () => {
        return statusData.map(object => object.value).indexOf(feature.status)
        
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
                <Title order={3}>Status</Title>
                <StatusBadge
                    status={status}
                />
            </Box>
            <Divider my="xs"/>
            <Group position="apart">
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    placeholder="Change Status"
                    data={statusData}
                />
                <ActionIcon 
                    size="xl" 
                    variant={!(feature.status === 'paused') ? "outline" : "filled"}
                    color={feature.status === 'paused' ? "green" : "blue"}
                    onClick={handlePause}
                >
                    {feature.status === 'paused' ? <PlayerPlay /> : <PlayerPause />}
                </ActionIcon>
            </Group>
            <Divider my="xs"/>
            <Timeline active={setActive()} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<GitBranch size={12} />} title="Created">
                    <Text color="dimmed" size="sm">Feature Created</Text>
                    <Text size="xs" mt={4}>2 hours ago</Text>
                </Timeline.Item>

                <Timeline.Item bullet={<GitCommit size={12} />} title="Working">
                    <Text color="dimmed" size="sm"></Text>
                    <Text size="xs" mt={4}>52 minutes ago</Text>
                </Timeline.Item>

                <Timeline.Item title="Ready for Review" bullet={<GitPullRequest size={12} />} lineVariant="dashed">
                    <Text color="dimmed" size="sm">Ready for completion review</Text>
                    <Text size="xs" mt={4}>34 minutes ago</Text>
                </Timeline.Item>

                <Timeline.Item title="Completed" bullet={<MessageDots size={12} />}>
                    <Text color="dimmed" size="sm">Feature Completed!</Text>
                    <Text size="xs" mt={4}>12 minutes ago</Text>
                </Timeline.Item>
            </Timeline>
        </Paper>
    )
}
