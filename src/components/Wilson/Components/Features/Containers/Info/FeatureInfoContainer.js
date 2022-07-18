import React, {useState, useEffect} from 'react'
import { Grid } from '@mantine/core'
import { CircleDashed, Activity, DotsCircleHorizontal, CircleCheck, PlayerPause, PlayerPlay } from 'tabler-icons-react';
import FeatureStatusContainer from './FeatureStatusContainer';
import FeaturePriorityContainer from './FeaturePriorityContainer';


export default function FeatureInfoContainer(props) {

    return (
        <Grid grow>
            <Grid.Col span={4}>
                <FeatureStatusContainer 
                    status={props.feature.status }
                    setFeature={props.setFeature}
                    feature={props.feature}
                    updateFeature={props.updateFeature}
                />
            </Grid.Col>
            <Grid.Col span={4}>
                <FeaturePriorityContainer
                    priority={props.feature.priority}
                    setFeature={props.setFeature}
                    feature={props.feature}
                    updateFeature={props.updateFeature}
                    setFetchAgainFlag={props.setFetchAgainFlag}
                />
            </Grid.Col>

        </Grid>
    )
}
