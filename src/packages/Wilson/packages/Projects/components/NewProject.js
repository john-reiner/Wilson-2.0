import React, {useState} from 'react'

import { Container, Group, Title, Button, Divider } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';
import ProjectForm from '../../global/ProjectForm';

export default function NewProject(props) {

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        public: false,
        image: ""
    });
    
    const handleChange = e => setNewProject({...newProject, [e.target.name]:e.target.value})
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: newProject})
                })
        .then(response => response.json())
        .then(payload => {
            setNewProject(
                {
                    title: "",
                    description: "",
                    github_url: "",
                    public: 'false',
                }
            )
            props.handleProjectShow(payload.id)
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
            <Divider my="xs"/>
            <ProjectForm
                project={newProject}
                handleSubmit={handleSubmit}
                setProject={setNewProject}
                handleChange={handleChange}
            />
        </Container>
    )
}