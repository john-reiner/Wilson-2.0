import React, {useState} from 'react'
import { Paper, SegmentedControl, Divider } from '@mantine/core'

import FeatureLink from '../Components/FeatureLink';

export default function FeaturesShowContainer(props) {

    const [priority, setPriority] = useState('all');

    const renderFeatures = (priority) => {
        if (props.features) {
            return props.features[priority].map(feature => {
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
        } else {
            return (
                <p>No Features</p>
            )
        }
    }

    return (
        <Paper
            shadow="xs" 
            p="sm"
        >
            <SegmentedControl
                fullWidth
                value={priority}
                onChange={setPriority}
                data={[
                    { label: 'All Features', value: 'all' },
                    { label: 'Priority: High', value: 'high' },
                    { label: 'Priority: Medium', value: 'medium' },
                    { label: 'Priority: Low', value: 'low' },
                ]}

            />
            <Divider 
                my="xs"
            />
            {renderFeatures(priority)}
        </Paper>
    )
}
