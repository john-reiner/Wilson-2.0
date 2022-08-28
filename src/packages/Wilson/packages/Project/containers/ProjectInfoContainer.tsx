import React from 'react'
import { ProjectInterface } from '../../global/interfaces/projectInterfaces';
import { Box, Divider, Grid, Paper } from '@mantine/core';

import FeaturesInfo from '../components/info/FeaturesInfo';
import Description from '../components/info/Description';
import LinkInfo from '../components/info/LinkInfo';
import InfoContainer from '../../global/InfoContainer';

interface ProjectInfoContainerProps {
    project: ProjectInterface
}

export default function ProjectInfoContainer({
    project
}: ProjectInfoContainerProps) {


    return (
        <Box
        >
            <Grid>
                <Grid.Col
                    sm={8}
                >
                <InfoContainer
                    title='Description'
                    color={project.color}
                    render={
                        <Description
                            color={project.color}
                            description={project.description}
                        />
                    }
                />

                </Grid.Col>
                <Grid.Col 
                    sm={4}
                >
                <InfoContainer
                    color={project.color}
                    render={
                        <LinkInfo
                            project={project}
                        />
                    }
                />
                </Grid.Col>
                <Grid.Col>
                <InfoContainer
                    title="features"
                    color={project.color}
                    totals={project.features_data?.total}
                    render={
                        <FeaturesInfo 
                            color={project.color}
                            totals={project.features_data}
                        />
                    }
                />
                </Grid.Col>
            </Grid>
        </Box>
    )
}
