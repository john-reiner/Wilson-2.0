import React from 'react'

import { Modal, Button, Group, Text, Stack, Divider } from '@mantine/core'

export default function DeleteModalConfirmation(props) {

    const deleteItem = (route) => {
        fetch(route, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            props.successFunction()
            props.setOpened(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title={`Delete ${props.item}?`}
        >
            <Stack>
                <Text>{`Are you sure you want to delete this ${props.item}?`}</Text>
                <Divider my="xs" />
                <Group position="apart" spacing="sm">
                    <Button variant="outline" color="grey" onClick={() => props.setOpened(false)}>Back</Button>
                    <Button variant="outline" color="red" onClick={() => deleteItem(props.route)}>Delete</Button>
                </Group>
            </Stack>
        </Modal>
    )
}