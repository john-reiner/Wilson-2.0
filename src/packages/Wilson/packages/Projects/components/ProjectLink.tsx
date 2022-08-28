import React from 'react'
import { ProjectInterface } from '../../global/interfaces/projectInterfaces';

import { Image, Text, Title, Button, Grid, Paper, Stack, Box, Table } from '@mantine/core'
import UserAvatar from '../../global/UserAvatar';
import { convertDate } from '../../global/helpers/convertDate';
import LinkInfo from '../../Project/components/info/LinkInfo';

interface ProjectLinkProps {
    project: ProjectInterface
    handleProjectShow: (id: number) => void
}


export default function ProjectLink({
    project,
    handleProjectShow
}: ProjectLinkProps) {

    console.log(project)

    return (
        <Grid.Col md={6} lg={3} xl={4}>
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.md,
                    cursor: 'pointer',
                    border: `solid 1px ${project.color}`,

                    '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                    },
                })}
                onClick={() => handleProjectShow(project.id ? project.id : 0)} 
            >
            
                <Grid
                    grow
                >
                <Grid.Col xs={6}>
                        <Stack>
                            <Title 
                                order={2}
                                className="wilson-logo-small"
                                color={project.color}
                            >
                                {project.title}
                            </Title>
                            <Text size="sm" lineClamp={1}>
                                {project.description}
                            </Text>
                        </Stack>                  
                </Grid.Col>
                <Grid.Col 
                    xs={6}
                >
                    <LinkInfo 
                        project={project}
                    />

                </Grid.Col>
            </Grid>
            </Box>
        </Grid.Col>
        )
    }