import React from 'react'

import { Button, Stack, TextInput, Textarea } from '@mantine/core';
import { FeatureType } from '../featureTypes';

interface FeatureFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    feature: FeatureType
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    color?: string
}

export default function FeatureForm({
    handleSubmit,
    feature,
    handleChange,
    color
}: FeatureFormProps) {
    
    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    placeholder="Example Feature..."
                    label="Feature Name"
                    required
                    name="title" 
                    value={feature.title} 
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Description..."
                    label="Feature Description"
                    name="description" 
                    value={feature.description} 
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth 
                    variant="outline"
                    color={color}
                >
                    Submit
                </Button>
            </Stack>
        </form>
    )
}
