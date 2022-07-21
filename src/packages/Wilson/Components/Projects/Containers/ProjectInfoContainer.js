import React from 'react'
import { Grid } from '@mantine/core';

import DescriptionCard from '../Components/DescriptionCard';

export default function ProjectInfoContainer(props) {
    return (
        <Grid>
            <Grid.Col>
                <DescriptionCard 
                    edit={props.project.edit} 
                    title={props.project.title}
                    image={props.project.image}
                    description={props.project.description} 
                    
                    />
            </Grid.Col>
        </Grid>
    )
}
