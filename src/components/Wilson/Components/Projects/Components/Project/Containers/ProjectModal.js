import React from 'react'
import { Modal } from '@mantine/core';
import InfoEditForm from '../Components/InfoEditForm';
import ConfirmDeleteProject from '../Components/ConfirmDeleteProject';

export default function ProjectModal(props) {

    const renderContent = () => {
        switch (props.modalOptions) {
            case "edit":
                return <InfoEditForm 
                            project={props.project}
                            setFetchAgainFlag={props.setFetchAgainFlag}
                            setModalOpen={props.setModalOpen}
                        />
            case "destroy":
                return <ConfirmDeleteProject 
                            id={props.id}
                            setViewToShow={props.setViewToShow}
                            userId={props.userId}
                        />
            default:
                break;
        }
    }

    return (
        <Modal
            opened={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
            title="Edit"
            size="xl"
            overflow="inside"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
        >
        {renderContent()}
        </Modal>
    )
}
