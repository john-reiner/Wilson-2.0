import React, {useState, useEffect} from 'react'

import { Paper, Box } from '@mantine/core';

import NoteNavBar from './components/NoteNavBar';
import NoteContent from './components/NoteContent';
import NoteForm from './components/NoteForm';

import DeleteModalConfirmation from '../global/DeleteModalConfirmation';
import { NotesComponentsInterface, NoteType, NoteComponentsInterface } from '../Notes/noteTypes';

interface NoteProps {
    route: string
    setFetchFlag: React.Dispatch<React.SetStateAction<boolean>>
    setOptionsToShow: React.Dispatch<React.SetStateAction<keyof NotesComponentsInterface>>
}

export default function Note({
    route,
    setFetchFlag,
    setOptionsToShow
}: NoteProps) {

    const [deleteModal, setDeleteModal] = useState(false);
    const [note, setNote] = useState<NoteType>({
        id: 0,
        title: "",
        content: "",
        created: "",
        modified: "",
        author: ""
    });
    const [noteComponentKey, setNoteComponentKey] = useState<keyof NoteComponentsInterface>('content');



    useEffect(() => {
        fetchNote()
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    const deleteSuccess = () => {
        setFetchFlag(true)
        setOptionsToShow("notes")
    }

    const fetchNote = () => {
        fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                })
        .then(response => response.json())
        .then(payload => {
            setNote(payload)
            
        })
        .catch(errors => {
            console.error(errors)
        })
    }



    const NoteComponents = {
        content: <NoteContent 
                    note={note}
                />,
        edit: <NoteForm
                    note={note}
                    setNote={setNote}
                    route={route}
                    setNoteComponentKey={setNoteComponentKey}
                    handleChange={handleChange}
                />
    }

    const renderNoteComponents = (
        noteComponents: NoteComponentsInterface,
        noteComponentKey: keyof NoteComponentsInterface
    ) => noteComponents[noteComponentKey]

    return (
        <Box
            // xs={12}
            // sm={6}
            // md={4}
            // lg={3}
            // xl={2}
        >
            <DeleteModalConfirmation 
                opened={deleteModal}
                setOpened={setDeleteModal}
                item="Note"
                route={route}
                successFunction={deleteSuccess}
            />
            <Paper
                withBorder
                shadow="md" 
                p="sm"
            >
                <NoteNavBar
                    setNoteComponentKey={setNoteComponentKey}
                    setDeleteModal={setDeleteModal}
                    noteComponentKey={noteComponentKey}
                />
                {renderNoteComponents(NoteComponents, noteComponentKey)}
            </Paper>
        </Box>
    )
}
