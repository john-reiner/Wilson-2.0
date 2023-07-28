import React from 'react'

import { Modal, Button, Group, Text, Stack, Divider } from '@mantine/core'

interface DeleteModalConfirmationProps {
    route: string
    successFunction: () => void
    opened: boolean
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    item: string
}

export default function DeleteModalConfirmation({
    route,
    successFunction,
    opened,
    setOpened,
    item
}: DeleteModalConfirmationProps) {

    const deleteItem = (
        route: string
    ) => {
        fetch(route, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            successFunction()
            setOpened(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={`Delete ${item}?`}
        >
            <Stack>
                <Text>{`Are you sure you want to delete this ${item}?`}</Text>
                <Divider my="xs" />
                <Group position="apart" spacing="sm">
                    <Button variant="outline" color="grey" onClick={() => setOpened(false)}>Back</Button>
                    <Button variant="outline" color="red" onClick={() => deleteItem(route)}>Delete</Button>
                </Group>
            </Stack>
        </Modal>
    )
}