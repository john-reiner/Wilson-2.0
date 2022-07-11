import React, {useState} from 'react'
import { TextInput, Textarea, Button, Stack, Switch } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';


export default function EditProject(props) {

    const [project, setProject] = useState(props.project);



    const handleChange = e => setProject({...project, [e.target.name]:e.target.value})
    const togglePublic = e => setProject({...project, [e.target.name]:e.target.checked})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: project})
                })
        .then(response => response.json())
        .then(payload => {
            props.setFetchAgainFlag(true)
            props.setModalOpen(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    placeholder="Example Project..."
                    label="Project Name"
                    required
                    name="title" 
                    value={project.title} 
                    onChange={handleChange}
                />
                <Textarea
                    placeholder="Description..."
                    label="Project Description"
                    name="description" 
                    value={project.description} 
                    onChange={handleChange}
                />
                <TextInput 
                    label="GitHub URL" 
                    placeholder="github" 
                    icon={<BrandGithub size={14} />} 
                    name="github_url" 
                    value={project.github_url} 
                    onChange={handleChange}

                    />
                <Switch
                    label="Public"
                    name="public" 
                    value={project.public}
                    onChange={togglePublic}
                    checked={project.public}
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
