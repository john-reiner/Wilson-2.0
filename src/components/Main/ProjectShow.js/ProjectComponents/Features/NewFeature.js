import React, {useState} from 'react'
import { Drawer, Button, Group, Stack, TextInput, Textarea, Switch } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

export default function NewFeature(props) {

    const [newFeature, setNewFeature] = useState({
        title: "",
        description: "",
        due_date: "",
        public: 'false',
    });

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/features`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: newFeature})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setNewFeature({
                    title: "",
                    description: "",
                    due_date: "",
                    public: 'false',
                })
                props.setFetchAgainFlag(true)
                props.setNewFeatureDrawerOpen(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = e => setNewFeature({...newFeature, [e.target.name]:e.target.value})
    const togglePublic = e => setNewFeature({...newFeature, [e.target.name]:e.target.checked})

    const changeDate = e => setNewFeature({...newFeature, 'due_date':e.toString()})

    return (
        <Drawer
            opened={props.newFeatureDrawerOpen}
            onClose={() => props.setNewFeatureDrawerOpen(false)}
            title="Create a new Feature"
            padding="xl"
            size="xl"
            transition="rotate-left"
            transitionDuration={250}
            transitionTimingFunction="ease"
            position="right"
        >
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            placeholder="Example Feature..."
                            label="Project Name"
                            required
                            name="title" 
                            value={newFeature.title} 
                            onChange={handleChange}
                        />
                        <Textarea
                            placeholder="Description..."
                            label="Feature Description"
                            name="description" 
                            value={newFeature.description} 
                            onChange={handleChange}
                        />
                        <DatePicker 
                            placeholder="Due date" 
                            label="Due date" 
                            name="due_date"
                            value={newFeature.due_date} 
                            onChange={changeDate}
                        />
                        <Switch
                            label="Public"
                            name="public" 
                            value={newFeature.public}
                            onChange={togglePublic}
                            // checked={newFeature.public}
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
        </Drawer>
        )
    }
