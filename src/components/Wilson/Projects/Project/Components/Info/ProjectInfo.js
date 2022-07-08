import React from 'react'
import { Grid } from '@mantine/core';

import DescriptionCard from './DescriptionCard';
import EditProjectModal from '../../EditProjectModal';


export default function Info(props) {
    return (
        <Grid>
            
            <Grid.Col>
                <DescriptionCard edit={props.edit} title={props.title} description={props.description} />
            </Grid.Col>
        </Grid>
    )
}
