import React, { useState, useEffect } from 'react'
import { Button, Stack } from '@mantine/core';

import NewFeature from './Components/NewFeature';
import Feature from '../Feature';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';
import { FeatureType } from './featureTypes';

interface FeaturesProps {
    setFetchAgainFlag: React.Dispatch<React.SetStateAction<boolean>>
    projectId: number
}

export default function Features({
    setFetchAgainFlag,
    projectId
}: FeaturesProps) {

    const featuresRoute = `http://localhost:3001/api/v2/projects/${projectId}/features`

    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState<number>(0);
    const [features, setFeatures] = useState<FeatureType[]>([]);

    
    useEffect(() => {
        fetchFeatures()
    }, []);
    
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

    return (
        <Stack>
            { featureModalOpen && 
                <Feature 
                    setFeatureModalOpen={setFeatureModalOpen}
                    featureModalOpen={featureModalOpen}
                    featureId={featureId}
                    projectId={projectId} 
                    setFetchAgainFlag={setFetchAgainFlag}
                />
            }
            { newFeatureModalOpen && 
                <NewFeature 
                    setFetchAgainFlag={setFetchAgainFlag} 
                    route={featuresRoute}
                    setFeatureModalOpen={setNewFeatureModalOpen} 
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
                // status={true}
            />

        </Stack>
    )
}
