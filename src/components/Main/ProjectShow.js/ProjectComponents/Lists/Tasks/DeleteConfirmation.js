import React from 'react'
import { Modal, Button, Group } from '@mantine/core'

export default function DeleteConfirmation(props) {

    const deleteTask = () => {
        fetch(`http://localhost:3001/api/v2/tasks/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                props.setTaskShowOpened(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="Delete this task?"
        >
            <Group position="apart" spacing="sm">
                <Button variant="outline" color="grey">Back</Button>
                <Button variant="outline" color="red" onClick={deleteTask}>Delete</Button>
            </Group>
        </Modal>
    )
}
