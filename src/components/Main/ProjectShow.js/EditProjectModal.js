import React from 'react'
import { Modal } from '@mantine/core';
import InfoEditForm from './InfoEditForm';

export default function EditProjectModal(props) {

    const renderContent = () => {
        switch (props.type) {
            case "info":
                return <InfoEditForm 
                            title={props.title} 
                            description={props.description}
                            github_url={props.github_url}
                            public={props.public}
                            projectId={props.projectId}
                            userId={props.userId}
                            setFetchAgainFlag={props.setFetchAgainFlag}
                            setEditModalOpen={props.setEditModalOpen}
                        />
                // break;
        
            default:
                break;
        }
    }

    return (
        <Modal
            opened={props.editModalOpen}
            onClose={() => props.setEditModalOpen(false)}
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
