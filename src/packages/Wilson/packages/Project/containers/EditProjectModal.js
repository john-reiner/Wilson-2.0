import React, {useState, useEffect} from 'react'

import { Modal } from '@mantine/core';

import ProjectForm from '../../global/ProjectForm';

export default function ProjectModal(props) {

    const [editedProject, setEditedProject] = useState({});

    const handleChange = e => setEditedProject({...editedProject, [e.target.name]:e.target.value})

    useEffect(() => {
        setEditedProject(props.project)
    }, [props.project]);

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${props.project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: editedProject})
                })
        .then(response => response.json())
        .then(payload => {
            props.setProject(payload)
            props.setModalOpen(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
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
                setFetchAgainFlag={props.setFetchAgainFlag}
                setModalOpen={props.setModalOpen}
                handleSubmit={handleSubmit}
            />
        </Modal>
    )
}
