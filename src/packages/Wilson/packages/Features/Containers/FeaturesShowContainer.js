import React, {useState} from 'react'

import { Tabs } from '@mantine/core'

import FeatureLink from '../Components/FeatureLink';

export default function FeaturesShowContainer(props) {

    const [priority, setPriority] = useState('all');
    const [activeTab, setActiveTab] = useState(0);

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

    const tabs = ['all', 'high', 'medium', 'low']

    const handleTabChange = (e) => {
        setActiveTab(e)
        setPriority(tabs[e])
    }

    return (
        <div
        >
            <Tabs 
                active={activeTab} 
                onTabChange={handleTabChange}
                variant="pills"
            >
                <Tabs.Tab label={`All (${props.features.all.length})`}>{renderFeatures(priority)}</Tabs.Tab>
                <Tabs.Tab label={`High (${props.features.high.length})`}>{renderFeatures(priority)}</Tabs.Tab>
                <Tabs.Tab label={`Medium (${props.features.medium.length})`}>{renderFeatures(priority)}</Tabs.Tab>
                <Tabs.Tab label={`Low (${props.features.low.length})`}>{renderFeatures(priority)}</Tabs.Tab>
            </Tabs>
        </div>
    )
}
