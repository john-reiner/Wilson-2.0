import React from 'react'

import { Paper } from '@mantine/core'

import FeatureLink from '../Components/FeatureLink';

export default function FeaturesShowContainer(props) {



    const renderFeatures = () => {
        let returnedFeatures = []
        props.features.forEach(feature => {
            if (props.status.includes(feature.status) || props.priority.includes(feature.priority)) {
                returnedFeatures.push(feature)
            }
        })
        if (returnedFeatures.length > 0) {
            return returnedFeatures.map(feature => {
                return (
                    <FeatureLink
                        title={feature.title}
                        handleLinkClick={props.handleLinkClick}
                        setFeatureId={props.setFeatureId}
                        id={feature.id}
                        key={feature.id}
                        status={feature.status}
                    />
                )
            })
        } else  {

            if (props.status.length === 0 && props.priority.length === 0) {
                return (
                    <p>No Features Selected</p>
                )
            }
            return (
                <p>No Features Found</p>
            )
        }
    }

    return (
        <Paper
            shadow="lg" 
            radius="sm" 
            p="sm" 
            withBorder
        >
            {renderFeatures()}
        </Paper>
    )
}
