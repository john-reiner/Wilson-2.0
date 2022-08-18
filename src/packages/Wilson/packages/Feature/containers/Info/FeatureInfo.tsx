import React from 'react'

import { Grid } from '@mantine/core'

import FeatureStatusContainer from './FeatureStatusContainer';
import FeaturePriorityContainer from './FeaturePriority';
import FeatureDescriptionContainer from './FeatureDescription';
import { FeatureType } from '../../../Features/featureTypes';

interface FeatureInfoContainerProps{
    feature: FeatureType
    setFeature: React.Dispatch<React.SetStateAction<FeatureType>>
    // updateFeature: (feature: FeatureType) => void
    route: string
    // setFetchAgainFlag: React.Dispatch<React.SetStateAction<boolean>>
}


export default function FeatureInfo({    
    feature,
    setFeature,
    // updateFeature,
    route,
    // setFetchAgainFlag
}: FeatureInfoContainerProps) {

    return (
        <Grid grow>
            <Grid.Col sm={6} md={6} lg={3}>
                <FeatureStatusContainer 
                    status={feature.status }
                    setFeature={setFeature}
                    feature={feature}
                    route={route}
                    // updateFeature={updateFeature}
                />
            </Grid.Col>
            <Grid.Col sm={6} md={6} lg={3}>
                <FeaturePriorityContainer
                    priority={feature.priority}
                    setFeature={setFeature}
                    feature={feature}
                    route={route}
                />
                <FeatureDescriptionContainer
                    description={feature.description}
                />
            </Grid.Col>

        </Grid>
    )
}
