import React, {useState} from 'react'

import { Modal } from '@mantine/core';

import FeatureForm from './FeatureForm';
import { FeatureType } from '../featureTypes';

interface NewFeatureProps {
    // setFetchAgainFlag: React.Dispatch<React.SetStateAction<boolean>>
    route:string
    setFeatureModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setNewFeatureModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFeatureId: React.Dispatch<React.SetStateAction<number>>
    newFeatureModalOpen: true
}

export default function NewFeature({
    // setFetchAgainFlag,
    route,
    setFeatureModalOpen,
    setNewFeatureModalOpen,
    setFeatureId,
    newFeatureModalOpen
}: NewFeatureProps) {

    const [feature, setFeature] = useState<FeatureType>({
        title: "",
        description: "",
        due_date: "",
        author: "",
        priority: "low",
        status: "created"
    });

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()
        fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: feature})
                })
        .then(response => response.json())
        .then(payload => {
            setFeature({
                title: "",
                description: "",
                due_date: "",
                author: "",
                priority: "low",
                status: "created"
            })
            setFeatureId(payload.id)
            setFeatureModalOpen(true)
            setNewFeatureModalOpen(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => setFeature({...feature, [e.target.name]:e.target.value})

    return (
        <Modal
            opened={newFeatureModalOpen}
            onClose={() => setNewFeatureModalOpen(false)}
            title="Create a new Feature"
            padding="xl"
            size="xl"
            transition="fade"
            transitionDuration={600}
        >
            <FeatureForm
                handleSubmit={handleSubmit}
                feature={{...feature}}
                handleChange={handleChange}
            />
        </Modal>
        )
    }
