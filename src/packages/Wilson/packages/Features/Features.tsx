import React, { useState, useEffect } from 'react'
import { Button, Grid, Paper, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature/Feature';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';
import { FeatureType } from './featureTypes';
import { Plus, Stars } from 'tabler-icons-react';
import InfoContainer from '../global/InfoContainer';

interface FeaturesProps {
    route: string
    color?: string
    colorName?: string
}

export default function Features({
    route,
    color,
    colorName
}: FeaturesProps) {
    
    const [newFeature, setNewFeature] = useState(false);
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

    const renderContent = (
        newFeatureBool: boolean
        ) => {
        if (newFeatureBool) {
            return (
                <NewFeature 
                    route={featuresRoute}
                    setFeatureModalOpen={setFeatureModalOpen} 
                    color={colorName}
                    setFeatureId={setFeatureId}
                />
                )
            } else {
                return (
                    <DisplayAllLinks
                        displayItem={"Feature"}
                        data={features}
                        linkClick={handleLinkClick}
                        status={true}
                        priority={true}
                        color={color}
                    />
            )
        }
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
                    <Grid.Col
                        xs={3}
                        >
                        <InfoContainer 
                            color={color}
                            render={
                                <Paper
                                    withBorder
                                    style={
                                        {
                                            height: "100%"
                                        }
                                    }
                                    p={"xs"}
                                >
                                    <Stack>
                                        <Button
                                            fullWidth
                                            size='xs'
                                            color={colorName}
                                            variant={newFeature ? "outline" : "filled"}
                                            leftIcon={<Stars size={14} />}
                                            onClick={() => setNewFeature(false)}
                                            >
                                                All Features
                                        </Button>
                                        <Button
                                            fullWidth
                                            size='xs'
                                            color={colorName}
                                            variant={newFeature ? "filled" : "outline"}
                                            leftIcon={<Plus size={14} />}
                                            onClick={() => setNewFeature(true)}
                                            >
                                                New Feature
                                        </Button>
                                    </Stack>
                                </Paper>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col
                        xs={9}
                        >

                        {renderContent(newFeature)}
                    </Grid.Col>
        </Grid>
    )
}
