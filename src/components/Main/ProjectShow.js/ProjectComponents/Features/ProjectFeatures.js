import React, {useState} from 'react'
import { Button, Stack, Table, Grid } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import Feature from './Feature'
import NewFeature from './NewFeature';

export default function Features(props) {

    const [newFeatureDrawerOpen, setNewFeatureDrawerOpen] = useState(false);

    const renderFeatures = () => {
        if (props.features.length > 0) {
            return props.features.map(feature => {
                return (
                    // <Accordion.Item label={feature.title}>
                    //     <Stack>
                    //         <Text>{feature.description}</Text>
                    //         <Text>{feature.due_date}</Text>
                    //         {feature.public && "PUBLIC"}
                    //     </Stack>
                    // </Accordion.Item>
                    <Feature 
                        title={feature.title}
                        description={feature.description}
                        dueDate={feature.due_date}
                        public={feature.public}
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
            <Button 
                leftIcon={<Plus size={14} />}
                onClick={() => setNewFeatureDrawerOpen(true)}
            >
                New Feature
            </Button>

            <NewFeature 
                setFetchAgainFlag={props.setFetchAgainFlag} 
                projectId={props.projectId} 
                userId={props.userId} 
                setNewFeatureDrawerOpen={setNewFeatureDrawerOpen} 
                newFeatureDrawerOpen={newFeatureDrawerOpen}
            />
            <Grid>
                {renderFeatures()}
            </Grid>
            {/* <Table highlightOnHover>
                <thead>
                    <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Public</th>
                            <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <Grid>
                        
                    </Grid>
                </tbody>
            </Table> */}
        </Stack>
    )
}
