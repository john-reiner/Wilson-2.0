import React, {useState, useEffect} from 'react'
import { ProjectInterface } from '../../global/interfaces/projectInterfaces';

import { Modal } from '@mantine/core';

import ProjectForm from '../../global/containers/ProjectForm/ProjectForm';

interface EditProjectModalProps {
    project: ProjectInterface
    setProject: React.Dispatch<React.SetStateAction<ProjectInterface>>
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    modalOpen: true
    setFetchAgainFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProjectModal({
    project,
    setProject,
    setModalOpen,
    modalOpen,
    setFetchAgainFlag,
}: EditProjectModalProps) {

    const [editedProject, setEditedProject] = useState<ProjectInterface>({
        id: 0,
        title: "",
        description: "",
        github_url: "",
        image: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
        ) => setEditedProject({...editedProject, [e.target.name]:e.target.value})

    useEffect(() => {
        setEditedProject(project)
    }, [project]);

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: editedProject})
                })
        .then(response => response.json())
        .then(payload => {
            setProject(payload)
            setModalOpen(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Edit Project"
            size="xl"
            overflow="inside"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
        >
            <ProjectForm 
                project={editedProject}
                setProject={setEditedProject}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}
