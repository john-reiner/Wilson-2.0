import React from 'react'
import { Modal } from '@mantine/core';
import NewNoteEditor from './NewNoteEditor';

export default function NewNoteModal(props) {
    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="New Note"
            size={"xl"}
            closeOnClickOutside={false}
        >
            <NewNoteEditor
                notable={props.notable}
                notableId={props.notableId}
                setNotes={props.setNotes}
                notes={props.notes}
            />
        </Modal>
    )
}
