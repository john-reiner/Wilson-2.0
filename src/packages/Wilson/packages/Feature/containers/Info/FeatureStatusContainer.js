import React from 'react'
import { Paper, Title, Box, Divider, Timeline, Text, Select, ActionIcon, Group } from '@mantine/core'
import { GitBranch, GitPullRequest, GitCommit, MessageDots, PlayerPlay, PlayerPause } from 'tabler-icons-react';
import StatusBadge from '../../../global/StatusBadge'

export default function FeatureStatusContainer(props) {

    const statusData = [
        { value: 'created', label: 'Created' },
        { value: 'working', label: 'Working' },
        { value: 'review', label: 'Ready for Review' },
        { value: 'completed', label: 'Completed' },
    ];

    const handleStatusChange = (e) => {
        props.setFeature({...props.feature, 'status': e})
        props.updateFeature({status: e})
    }

    const handlePause = () => {
        if (props.status !== 'paused') {
            props.setFeature({...props.feature, 'status': 'paused'})
            props.updateFeature({status: 'paused'})
        } else {
            props.setFeature({...props.feature, 'status': 'working'})
            props.updateFeature({status: 'working'})
        }
    }

    const setActive= () => {
        return statusData.map(object => object.value).indexOf(props.feature.status)
        
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
                    status={props.status}
                />
            </Box>
            <Divider my="xs"/>
            <Group position="apart">
                <Select
                    value={props.status}
                    onChange={handleStatusChange}
                    placeholder="Change Status"
                    data={statusData}
                />
                <ActionIcon 
                    size="xl" 
                    variant={!(props.feature.status === 'paused') ? "outline" : "filled"}
                    color={props.feature.status === 'paused' && "green"}
                    onClick={handlePause}
                >
                    {props.feature.status === 'paused' ? <PlayerPlay /> : <PlayerPause />}
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
