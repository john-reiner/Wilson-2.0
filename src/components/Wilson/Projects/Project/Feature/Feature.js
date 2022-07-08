import React, {useState, useEffect} from 'react'
import { Group, Button, Title, Paper } from '@mantine/core';

import FeatureTab from './FeatureTab';

export default function Feature(props) {

    const {projectId, featureId, setFeatureTitle} = props
    const [feature, setFeature] = useState({});

    useEffect(() => {
        fetchFeature()
        return () => {
            setFeatureTitle("")
        };
    }, []);


    const fetchFeature = () => {
        fetch(`http://localhost:3001/api/v2/projects/${projectId}/features/${featureId}`)
        .then(response => response.json())
        .then(payload => {
            setFeature(payload)
            setFeatureTitle(payload.title)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const featureShowTabs = ["Info", "Lists", "Notes"]

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <FeatureTab 
                        name={tab} 
                        // handleTabClick={handleTabClick}
                        // changeProjectContent={changeProjectContent}
                        // projectContent={projectContent}
                        // index={projectComponents.indexOf(tab)}
                        key={keyNum}
                    />
        })
    }

    return (
        <Paper
            style={
                {
                    height: "100vh"
                }
            }
        >
            <Title 
                order={2}
                // className="wilson-logo-small"
                color="green"
            >
                {feature.title}
            </Title>
            <Group spacing="xs">
                {renderTabs(featureShowTabs)}
                {/* <Button variant="outline">Info</Button>
                <Button variant="outline">Lists</Button>
                <Button variant="outline">Notes</Button> */}
            </Group>
        </Paper>
    )
}
