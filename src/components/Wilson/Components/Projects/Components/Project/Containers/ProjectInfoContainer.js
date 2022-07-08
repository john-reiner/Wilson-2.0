import React from 'react'
import { Grid } from '@mantine/core';

import DescriptionContainer from './DescriptionContainer';
import EditProjectModal from '../EditProjectModal';


export default function ProjectInfoContainer(props) {
    return (
        <Grid>
            <Grid.Col>
                <DescriptionContainer edit={props.edit} title={props.title} description={props.description} />
            </Grid.Col>
        </Grid>
    )
}
