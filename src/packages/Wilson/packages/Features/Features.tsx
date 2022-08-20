import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature/Feature';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';
import { FeatureType } from './featureTypes';
import { Plus } from 'tabler-icons-react';

interface FeaturesProps {
    route: string
}

export default function Features({
    route
}: FeaturesProps) {
    
    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState<number>(0);
    const [features, setFeatures] = useState<FeatureType[]>([]);
    const [reloadFeatures, setReloadFeatures] = useState(true)



    const featuresRoute = `${route}/features`
    const featureRoute = `${featuresRoute}/${featureId}`
    
    useEffect(() => {
        if (reloadFeatures) {
            fetchFeatures()
            setReloadFeatures(false)
        }
    }, [reloadFeatures]);
    
    const fetchFeatures = () => {
        fetch(featuresRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
        }
        )
        .then(response => response.json())
        .then(payload => {
            setFeatures(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }
    
    const handleLinkClick = (
        id: number
    ) => {
        setFeatureId(id)
        setFeatureModalOpen(true)
    }

    const handleFeatureClose = () => {
        setFeatureModalOpen(false)
        setReloadFeatures(true)
    }

    return (
        <Grid>
            { featureModalOpen && 
                <Feature 
                    setFeatureModalOpen={setFeatureModalOpen}
                    featureModalOpen={featureModalOpen}
                    route={featureRoute}
                    handleFeatureClose={handleFeatureClose}
                    setReloadFeatures={setReloadFeatures}
                />
            }
            { newFeatureModalOpen && 
                <NewFeature 
                    route={featuresRoute}
                    setFeatureModalOpen={setFeatureModalOpen} 
                    newFeatureModalOpen={newFeatureModalOpen}
                    setNewFeatureModalOpen={setNewFeatureModalOpen}
                    setFeatureId={setFeatureId}
                />
            }
            <Grid.Col
                xs={2}
            >
                <Button
                    fullWidth
                    size='xs'
                    color="blue"
                    leftIcon={<Plus size={14} />}
                    onClick={() => setNewFeatureModalOpen(true)}
                >New Feature</Button>
            </Grid.Col>
            <Grid.Col
                xs={10}
            >
                <DisplayAllLinks
                    displayItem={"Feature"}
                    data={features}
                    linkClick={handleLinkClick}
                    status={true}
                    priority={true}
                />
            </Grid.Col>

        </Grid>
    )
}
