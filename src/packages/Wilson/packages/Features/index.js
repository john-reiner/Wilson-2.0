import React, { useState } from 'react'
import { Button, Stack, Accordion } from '@mantine/core';

import FeatureLink from './Components/FeatureLink'
import NewFeature from './Components/NewFeature';
import Feature from '../Feature';
import FeaturesNav from './Containers/FeaturesNav/FeaturesNav';
import FeaturesShowContainer from './Containers/FeaturesShowContainer';

export default function Features(props) {

    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState(null);
    const [showFeaturesSelect, setShowFeaturesSelect] = useState(false);

    const handleLinkClick = (id) => {
        setFeatureId(id)
        setFeatureModalOpen(true)
    }

    return (
        <Stack>
            <Feature 
                setFeatureModalOpen={setFeatureModalOpen}
                featureModalOpen={featureModalOpen}
                featureId={featureId}
                projectId={props.projectId} 
                setFetchAgainFlag={props.setFetchAgainFlag}
            />
            <FeaturesNav
                setNewFeatureModalOpen={setNewFeatureModalOpen}
                setShowFeaturesSelect={setShowFeaturesSelect}
                showFeaturesSelect={showFeaturesSelect}
            />
            <NewFeature 
                setFetchAgainFlag={props.setFetchAgainFlag} 
                projectId={props.projectId} 
                userId={props.userId} 
                setFeatureModalOpen={setNewFeatureModalOpen} 
                newFeatureModalOpen={newFeatureModalOpen}
            />
            <FeaturesShowContainer
                features={props.features}
                handleLinkClick={handleLinkClick}
                setFeatureId={setFeatureId}
            />
        </Stack>
    )
}
