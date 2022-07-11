import React from 'react'
import { Grid } from '@mantine/core';

import DescriptionContainer from '../Components/DescriptionCard';

export default function ProjectInfoContainer(props) {
    return (
        <Grid>
            <Grid.Col>
                <DescriptionContainer 
                    edit={props.project.edit} 
                    title={props.project.title} 
                    description={props.project.description} 
                        
                    />
            </Grid.Col>
        </Grid>
    )
}
