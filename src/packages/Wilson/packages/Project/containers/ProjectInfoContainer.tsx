import React from 'react'
import { ProjectInterface } from '../../global/interfaces/projectInterfaces';
import { Grid } from '@mantine/core';

import DescriptionCard from '../components/DescriptionCard';

interface ProjectInfoContainerProps {
    project: ProjectInterface
}

export default function ProjectInfoContainer({
    project
}: ProjectInfoContainerProps) {
    return (
        <Grid>
            <Grid.Col>
                <DescriptionCard 
                    title={project.title}
                    image={project.image}
                    description={project.description} 
                    />
            </Grid.Col>
        </Grid>
    )
}
