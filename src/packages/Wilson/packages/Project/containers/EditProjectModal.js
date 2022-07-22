import React from 'react'
import { Modal } from '@mantine/core';
import EditProjectForm from '../components/EditProjectForm';

export default function ProjectModal(props) {


    return (
        <Modal
            opened={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
            title={props.modalOptions}
            size="xl"
            overflow="inside"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
        >
            <EditProjectForm 
                project={props.project}
                setFetchAgainFlag={props.setFetchAgainFlag}
                setModalOpen={props.setModalOpen}
            />
        </Modal>
    )
}
