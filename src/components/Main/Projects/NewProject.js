import React, {useState} from 'react'
import { TextInput, Container, Group, Title, Textarea, Button, Stack, Switch } from '@mantine/core';
import { ArrowBackUp, BrandGithub } from 'tabler-icons-react';


export default function NewProject(props) {

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        public: false,
    });
    
    const handleChange = e => setNewProject({...newProject, [e.target.name]:e.target.value})
    const togglePublic = e => setNewProject({...newProject, [e.target.name]:e.target.checked})
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: newProject})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setNewProject(
                    {
                        title: "",
                        description: "",
                        github_url: "",
                        public: 'false',
                    }
                )
                props.handleProjectShow(payload.message.id)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Container id="new-project-container">
            <Group position="apart">
                <div>
                    <Title order={2} className="wilson-logo-small">Create a Project</Title>
                </div>
                <div>
                    <Button onClick={() => props.setViewToShow(0)} leftIcon={<ArrowBackUp size={14} />}>
                        Back
                    </Button>
                </div>
            </Group>
            <hr></hr>

                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            placeholder="Example Project..."
                            label="Project Name"
                            required
                            name="title" 
                            value={newProject.title} 
                            onChange={handleChange}
                        />
                        <Textarea
                            placeholder="Description..."
                            label="Project Description"
                            name="description" 
                            value={newProject.description} 
                            onChange={handleChange}
                        />
                        <TextInput 
                            label="GitHub URL" 
                            placeholder="github" 
                            icon={<BrandGithub size={14} />} 
                            name="github_url" 
                            value={newProject.github_url} 
                            onChange={handleChange}

                            />
                        <Switch
                            label="Public"
                            name="public" 
                            value={newProject.public}
                            onChange={togglePublic}
                            // checked={newProject.public}
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

        </Container>
    )
}