import React, {useState} from 'react'

import { Paper, Grid } from '@mantine/core';

import NoteNavBar from './components/NoteNavBar';
import NoteBody from './containers/NoteBody';

import DeleteModalConfirmation from '../global/DeleteModalConfirmation';

export default function Note(props) {

    const [edit, setEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [note, setNote] = useState(props.note);

    const handleChange = e => setNote({...note, [e.target.name]:e.target.value})

    const deleteSuccess = () => {
        props.setFetchFlag(true)
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes/${props.note.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({note: note})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setNote(payload.note)
                setEdit(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <Grid.Col 
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
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
                // p="sm"
            >
                <NoteNavBar 
                    edit={edit}
                    setEdit={setEdit}
                    setDeleteModal={setDeleteModal}
                />
                <NoteBody 
                    content={note.content}
                    edit={edit}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Paper>
        </Grid.Col>
    )
}
