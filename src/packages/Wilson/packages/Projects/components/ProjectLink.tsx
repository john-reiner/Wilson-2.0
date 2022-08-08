import React from 'react'
import { ProjectInterface } from '../../global/interfaces/projectInterfaces';

import { Image, Text, Title, Button, Grid, Paper, Stack } from '@mantine/core'

interface ProjectLinkProps {
    project: ProjectInterface
    handleProjectShow: (id: number) => void
}


export default function ProjectLink({
    project,
    handleProjectShow
}: ProjectLinkProps) {

    return (
        <Grid.Col lg={6} xl={4}>
            <Paper 
                shadow="md" 
                withBorder
            >
            
                <Grid
                    grow
                >
                    <Grid.Col 
                        sm={4}
                    >

                        <Image 
                            src={project.image ? project.image : "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg"} 
                            height={160} 
                            alt="Norway"
                        />                    
                    </Grid.Col>
                    <Grid.Col sm={8}>
                        <Paper
                            p="xs"
                        >
                            <Stack>
                                <Title order={2}>{project.title}</Title>
                                <Text size="sm" lineClamp={1}>
                                    {project.description}
                                </Text>
                                <Button 
                                    variant="light" color="blue" 
                                    fullWidth 
                                    style={{ marginTop: 14 }}
                                    onClick={() => handleProjectShow(project.id)} 
                                >
                                    View Project
                                </Button>
                            </Stack>                    
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Grid.Col>
        )
    }