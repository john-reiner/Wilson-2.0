import React from 'react'

import { Grid } from '@mantine/core'

import FeatureStatusContainer from './FeatureStatusContainer';
import FeaturePriorityContainer from './FeaturePriorityContainer';
import FeatureDescriptionContainer from './FeatureDescriptionContainer';


export default function FeatureInfoContainer(props) {

    return (
        <Grid grow>
            <Grid.Col sm={6} md={6} lg={3}>
                <FeatureStatusContainer 
                    status={props.feature.status }
                    setFeature={props.setFeature}
                    feature={props.feature}
                    updateFeature={props.updateFeature}
                />
            </Grid.Col>
            <Grid.Col sm={6} md={6} lg={3}>
                <FeaturePriorityContainer
                    priority={props.feature.priority}
                    setFeature={props.setFeature}
                    feature={props.feature}
                    updateFeature={props.updateFeature}
                    setFetchAgainFlag={props.setFetchAgainFlag}
                />
                <FeatureDescriptionContainer
                    description={props.feature.description}
                />
            </Grid.Col>

        </Grid>
    )
}
