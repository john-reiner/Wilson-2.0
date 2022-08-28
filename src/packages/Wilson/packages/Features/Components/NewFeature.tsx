import React, {useState} from 'react'

import FeatureForm from './FeatureForm';
import { FeatureType } from '../featureTypes';

interface NewFeatureProps {
    route:string
    setFeatureModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFeatureId: React.Dispatch<React.SetStateAction<number>>
    color?: string
}

export default function NewFeature({
    route,
    setFeatureModalOpen,
    setFeatureId,
    color
}: NewFeatureProps) {

    const [feature, setFeature] = useState<FeatureType>({
        title: "",
        description: "",
        due_date: "",
        author: "",
        priority: "low",
        status: "created",
        modified: ""
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
                status: "created",
                modified: ""
            })
            setFeatureId(payload.id)
            setFeatureModalOpen(true)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => setFeature({...feature, [e.target.name]:e.target.value})

    return (
            <FeatureForm
                handleSubmit={handleSubmit}
                feature={{...feature}}
                handleChange={handleChange}
                color={color}
            />
        )
    }
