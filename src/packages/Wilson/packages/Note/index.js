import React, {useState, useEffect} from 'react'

import { Paper, Box } from '@mantine/core';

import NoteNavBar from './components/NoteNavBar';
import NoteContent from './components/NoteContent';
import NoteForm from './components/NoteForm';

import DeleteModalConfirmation from '../global/DeleteModalConfirmation';

export default function Note(props) {

    const [deleteModal, setDeleteModal] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [optionsToShow, setOptionsToShow] = useState('content');

    useEffect(() => {
        fetchNote()
    }, []);

    // const handleTitleChange = e => setNote({...note, title: e.target.})

    // const handleChange = e => {
    //     setNote({...note, [e.target.name]:e.target.value})
    // }

    const deleteSuccess = () => {
        props.setFetchFlag(true)
        props.setOptionsToShow("notes")
    }

    const fetchNote = () => {
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes/${props.id}`, {
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

    const updateNote = (e, payload) => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({note: payload})
                })
        .then(response => response.json())
        .then(payload => {
            setNote(payload)
            setOptionsToShow("content")
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const options = {
        content: <NoteContent 
                    note={note}
                />,
        edit: <NoteForm 
                    note={note}
                    setNote={setNote}
                    handleSubmit={updateNote}
                />
    }

    const render = (options) => options[optionsToShow]

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
                route={`${props.notable}/${props.notableId}/notes/${note.id}`}
                successFunction={deleteSuccess}
            />
            <Paper
                withBorder
                shadow="md" 
                p="sm"
            >
                <NoteNavBar
                    setOptionsToShow={setOptionsToShow}
                    setDeleteModal={setDeleteModal}
                />
                {render(options)}
            </Paper>
        </Box>
    )
}
