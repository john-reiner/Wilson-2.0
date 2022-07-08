import React from 'react'
import { Modal, Group, Button} from '@mantine/core';

export default function DeleteProjectModal(props) {

    const deleteProject = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                props.setViewToShow(0)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setDeleteConfirmationModalOpen(false)}
            title="Are you sure you want to delete this project?"
        >   
            <Group position="apart" grow>
                <Button 
                    variant="outline" 
                    color={'red'}
                    onClick={deleteProject}
                >
                    Yes
                </Button>
                <Button 
                    variant="outline" 
                    onClick={() => props.setDeleteConfirmationModalOpen(false)}
                >
                    no
                </Button>
            </Group>        
        </Modal>
)
}
