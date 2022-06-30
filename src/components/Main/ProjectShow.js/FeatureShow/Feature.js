import React, {useState, useEffect} from 'react'
import { Grid } from '@mantine/core';

export default function Feature(props) {

    const {projectId, userId, featureId, setFeatureTitle} = props

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

    return (
        <Grid>
            <Grid.Col md={6} lg={3}>{feature.description}</Grid.Col>
            <Grid.Col md={6} lg={3}>2</Grid.Col>
            <Grid.Col md={6} lg={3}>3</Grid.Col>
            <Grid.Col md={6} lg={3}>4</Grid.Col>
        </Grid>
    )
}
