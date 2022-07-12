import React, {useState} from 'react'
import { Modal } from '@mantine/core';

import FeatureForm from './FeatureForm';

export default function NewFeature(props) {

    const [feature, setFeature] = useState({
        title: "",
        description: "",
        due_date: "",
        public: false,
        project_id: props.projectId
    });

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/features`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: feature})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setFeature({
                    title: "",
                    description: "",
                    due_date: "",
                    public: false,
                    project_id: props.projectId
                })
                props.setFetchAgainFlag(true)
                props.setFeatureModalOpen(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = e => setFeature({...feature, [e.target.name]:e.target.value})
    const togglePublic = e => setFeature({...feature, [e.target.name]:e.target.checked})

    const changeDate = e => setFeature({...feature, 'due_date':e.toString()})

    return (
        <Modal
            opened={props.newFeatureModalOpen}
            onClose={() => props.setFeatureModalOpen(false)}
            title="Create a new Feature"
            padding="xl"
            size="xl"
            transition="fade"
            transitionDuration={600}
        >
            <FeatureForm
                handleSubmit={handleSubmit}
                feature={{...feature}}
                changeDate={changeDate}
                togglePublic={togglePublic}
                handleChange={handleChange}
            />
        </Modal>
        )
    }
