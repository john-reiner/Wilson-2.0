import React, {useEffect, useState} from 'react'
import { Modal } from '@mantine/core';
import ShowFeatureContainer from './ShowFeatureContainer';



export default function FeatureModalContainer(props) {

    const [feature, setFeature] = useState({});

    useEffect(() => {
        if (typeof props.featureId === "number") {
            fetchFeature()
        }
    }, [props.featureId]);

    const fetchFeature = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/features/${props.featureId}`)
        .then(response => response.json())
        .then(payload => {
            setFeature(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }



    return (
        <Modal
            opened={props.featureModalOpen}
            onClose={() => props.setFeatureModalOpen(false)}
            title={feature.title}
            size="full" 
        >
            <ShowFeatureContainer 
                title={props.title}
            />
        </Modal>
    )
}
