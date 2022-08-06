import React, { useState, useEffect } from 'react'
import { Grid, Paper, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature';
import FeaturesNav from './Containers/FeaturesNav/FeaturesNav';
import FeatureLink from './Components/FeatureLink'
// import FeaturesShowContainer from './Containers/FeaturesShowContainer';
import DisplayAllLinks from '../global/containers/DisplayAllLinks';

export default function Features(props) {

    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState(null);
    const [showFeaturesSelect, setShowFeaturesSelect] = useState(false);
    const [priorities, setPriorities] = useState([]);
    const [statuses, setStatuses] = useState([]);
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

    const renderFeatures = () => {
        let returnedFeatures = []
        features.forEach(feature => {
            if (statuses.includes(feature.status) || priorities.includes(feature.priority)) {
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

            if (statuses.length === 0 && priorities.length === 0) {
                return (
                    <Paper p="md">No Features Selected</Paper>
                )
            }
            return (
                <Paper p="md">No Features Found</Paper>
            )
        }
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
                        setPriorities={setPriorities}
                        setStatuses={setStatuses}
                        counts={counts}

                    />
                </Grid.Col>
                <Grid.Col
                    sm={9}
                >
                    <DisplayAllLinks
                        displayItem={"Feature"}
                        render={renderFeatures}
                        count={features.length}
                        data={features}
                        linkClick={handleLinkClick}
                        status={true}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    )
}
