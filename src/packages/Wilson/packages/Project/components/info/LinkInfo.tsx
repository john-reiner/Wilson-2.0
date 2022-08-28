import React from 'react'
import { Box, Group, Stack, Text } from '@mantine/core';
import { ProjectInterface } from '../../../global/interfaces/projectInterfaces';
import UserAvatar from '../../../global/UserAvatar';
import { convertDate } from '../../../global/helpers/convertDate';

interface LinkInfoProps {
    project: ProjectInterface
}

export default function LinkInfo({
    project
}: LinkInfoProps) {

    return (
        <Stack
            sx={(theme) => ({
                padding: theme.spacing.xs,
            })}
            spacing="xs"
        >
            <Group
                position="apart"
            >
                <Text>Author:</Text>
                <UserAvatar 
                    author={project.author}                                            
                />
            </Group>
            <Group
                position="apart"
            >
                <Text>Features:</Text>
                <Text>{project.features_count}</Text>
            </Group>
            <Group
                position="apart"
            >
                <Text>Created:</Text>
                <Text>{convertDate(project.created)}</Text>
            </Group>
            <Group
                position="apart"
            >
                <Text>Modified:</Text>
                <Text>{convertDate(project.modified)}</Text>
            </Group>
        </Stack>
    )
}
