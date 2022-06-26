import React, {useState, useEffect} from 'react'

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
        fetch(`http://localhost:3001/api/v2/users/${userId}/projects/${projectId}/features/${featureId}`)
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
        <div>Feature</div>
    )
}
