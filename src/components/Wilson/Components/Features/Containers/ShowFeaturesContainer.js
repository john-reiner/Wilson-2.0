import React, {useState} from 'react'
import { Button, Stack, Grid } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import FeatureLink from '../Components/FeatureLink'
import NewFeature from '../Components/NewFeature';
import ShowFeatureContainer from './ShowFeatureContainer';

export default function Features(props) {

    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState(null);

    const handleLinkClick = (id) => {
        setFeatureId(id)
        setFeatureModalOpen(true)
    }

    const renderFeatures = () => {
        if (props.features.length > 0) {
            return props.features.map(feature => {
                return (
                    <FeatureLink 
                        title={feature.title}
                        description={feature.description}
                        dueDate={feature.due_date}
                        public={feature.public}
                        handleLinkClick={handleLinkClick}
                        setFeatureId={props.setFeatureId}
                        id={feature.id}
                        key={feature.id}
                        
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
        <Stack>
            <ShowFeatureContainer 
                setFeatureModalOpen={setFeatureModalOpen}
                featureModalOpen={featureModalOpen}
                featureId={featureId}
                projectId={props.projectId} 
                setFetchAgainFlag={props.setFetchAgainFlag}
            />
            <Button 
                leftIcon={<Plus size={14} />}
                onClick={() => setNewFeatureModalOpen(true)}
            >
                New Feature
            </Button>

            <NewFeature 
                setFetchAgainFlag={props.setFetchAgainFlag} 
                projectId={props.projectId} 
                userId={props.userId} 
                setFeatureModalOpen={setNewFeatureModalOpen} 
                newFeatureModalOpen={newFeatureModalOpen}
            />
            <Grid>
                {renderFeatures()}
            </Grid>
        </Stack>
    )
}
