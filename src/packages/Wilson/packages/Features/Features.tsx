import React, { useState, useEffect } from 'react'
import { Button, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature/Feature';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';
import { FeatureType } from './featureTypes';

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

    // const featuresRoute = `http://localhost:3001/api/v2/projects/${projectId}/features`
    const featureRoute = `${route}${featureId}`
    
    useEffect(() => {
        if (reloadFeatures) {
            fetchFeatures()
            setReloadFeatures(false)
        }
    }, [reloadFeatures]);
    
    const fetchFeatures = () => {
        fetch(route, {
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
        <Stack>
            { featureModalOpen && 
                <Feature 
                    setFeatureModalOpen={setFeatureModalOpen}
                    featureModalOpen={featureModalOpen}
                    route={featureRoute}
                    // setFetchAgainFlag={setFetchAgainFlag}
                    handleFeatureClose={handleFeatureClose}
                    setReloadFeatures={setReloadFeatures}
                />
            }
            { newFeatureModalOpen && 
                <NewFeature 
                    // setFetchAgainFlag={setFetchAgainFlag} 
                    route={route}
                    setFeatureModalOpen={setFeatureModalOpen} 
                    newFeatureModalOpen={newFeatureModalOpen}
                    setNewFeatureModalOpen={setNewFeatureModalOpen}
                    setFeatureId={setFeatureId}
                />
            }
            <Button
                onClick={() => setNewFeatureModalOpen(true)}
            >New Feature</Button>

            <DisplayAllLinks
                displayItem={"Feature"}
                data={features}
                linkClick={handleLinkClick}
                status={true}
                priority={true}
            />

        </Stack>
    )
}
