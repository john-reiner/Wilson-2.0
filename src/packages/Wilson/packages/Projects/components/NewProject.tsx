import React, {useState} from 'react'
import { NewProjectInterface } from '../../global/interfaces/projectInterfaces';
import { Container, Group, Title, Button, Divider } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';
import ProjectForm from '../../global/containers/ProjectForm/ProjectForm';

interface NewProjectProps {
    handleProjectShow: (id: number) => void
    setViewToShow: React.Dispatch<React.SetStateAction<number>>
}

export default function NewProject({
    handleProjectShow,
    setViewToShow
}: NewProjectProps) {

    const [newProject, setNewProject] = useState<NewProjectInterface>({
        title: "",
        description: "",
        github_url: "",
        image: ""
    });
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
        ) => setNewProject({...newProject, [e.target.name]:e.target.value})
    
    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
        ) => {
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
                    image: ""
                }
            )
            handleProjectShow(payload.id)
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
                    <Button onClick={() => setViewToShow(0)} leftIcon={<ArrowBackUp size={14} />}>
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