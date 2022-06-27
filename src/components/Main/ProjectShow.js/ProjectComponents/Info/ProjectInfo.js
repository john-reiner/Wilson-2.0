import React from 'react'
import { Grid } from '@mantine/core';

import DescriptionCard from './DescriptionCard';
import EditProjectModal from '../../EditProjectModal';


export default function Info(props) {
    return (
        <Grid>
            <EditProjectModal setFetchAgainFlag={props.setFetchAgainFlag} userId={props.userId} projectId={props.projectId} type={props.editType} title={props.title} github_url={props.github_url} public={props.public} description={props.description} setEditModalOpen={props.setEditModalOpen} editModalOpen={props.editModalOpen}/>
            <Grid.Col>
                <DescriptionCard edit={props.edit} title={props.title} description={props.description} />
            </Grid.Col>
        </Grid>
    )
}
