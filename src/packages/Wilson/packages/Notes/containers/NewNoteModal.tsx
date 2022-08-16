import React from 'react'
import { Modal } from '@mantine/core';
import NewNoteEditor from './NewNoteEditor';
import { NoteType } from '../noteTypes';

interface NewNoteModalProps {
    opened: boolean
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
    notes: NoteType[]
    route: string
}

export default function NewNoteModal({
    opened,
    setOpened,
    setNotes,
    notes,
    route
}: NewNoteModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="New Note"
            size={"xl"}
            closeOnClickOutside={false}
        >
            <NewNoteEditor
                setNotes={setNotes}
                notes={notes}
                setOpened={setOpened}
                route={route}
            />
        </Modal>
    )
}
