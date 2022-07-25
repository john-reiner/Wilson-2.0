import React from 'react'

import { Button, Stack, TextInput, Textarea, Switch } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

export default function FeatureForm(props) {
    
    return (
        <form onSubmit={props.handleSubmit}>
            <Stack>
                <TextInput
                    placeholder="Example Feature..."
                    label="Project Name"
                    required
                    name="title" 
                    value={props.feature.title} 
                    onChange={props.handleChange}
                />
                <Textarea
                    placeholder="Description..."
                    label="Feature Description"
                    name="description" 
                    value={props.feature.description} 
                    onChange={props.handleChange}
                />
                <DatePicker 
                    placeholder="Due date" 
                    label="Due date" 
                    name="due_date"
                    value={props.feature.due_date} 
                    onChange={props.changeDate}
                />
                <Switch
                    label="Public"
                    name="public" 
                    value={props.feature.public}
                    onChange={props.togglePublic}
                    checked={props.feature.public}
                />
                <Button
                    type="submit"
                    fullWidth 
                    variant="outline"
                >
                    Submit
                </Button>
            </Stack>
        </form>
    )
}
