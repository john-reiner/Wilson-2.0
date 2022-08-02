import React, { useState, useEffect } from 'react'
import { Grid, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature';
import FeaturesNav from './Containers/FeaturesNav/FeaturesNav';
import FeaturesShowContainer from './Containers/FeaturesShowContainer';

export default function Features(props) {

    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState(null);
    const [showFeaturesSelect, setShowFeaturesSelect] = useState(false);
    const [priority, setPriority] = useState([]);
    const [status, setStatus] = useState([]);
    const [features, setFeatures] = useState([]);
    const [counts, setCounts] = useState({});

    const handleLinkClick = (id) => {
        setFeatureId(id)
        setFeatureModalOpen(true)
    }


    useEffect(() => {
        fetchFeatures()
    }, []);

    const fetchFeatures = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/features`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setFeatures(payload.features)
            setCounts(payload.counts)

        })
        .catch(errors => {
            console.error(errors)
        })
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
            <NewFeature 
                setFetchAgainFlag={props.setFetchAgainFlag} 
                projectId={props.projectId} 
                userId={props.userId} 
                setFeatureModalOpen={setNewFeatureModalOpen} 
                newFeatureModalOpen={newFeatureModalOpen}
            />
            <Grid
                gutter="xs"
            >
                <Grid.Col
                    sm={3}
                >
                    <FeaturesNav
                        setNewFeatureModalOpen={setNewFeatureModalOpen}
                        setShowFeaturesSelect={setShowFeaturesSelect}
                        showFeaturesSelect={showFeaturesSelect}
                        setPriority={setPriority}
                        setStatus={setStatus}
                        counts={counts}

                    />
                </Grid.Col>
                <Grid.Col
                    sm={9}
                >
                    <FeaturesShowContainer
                        projectId={props.projectId}
                        handleLinkClick={handleLinkClick}
                        setFeatureId={setFeatureId}
                        priority={priority}
                        status={status}
                        features={features}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    )
}
