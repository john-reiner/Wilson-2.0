import React, {useState} from 'react'
import { RichTextEditor } from '@mantine/rte';
import { Button, Stack } from '@mantine/core';

export default function NewNoteEditor(props) {

    const [newNote, setNewNote] = useState('');

    const handleSubmit = e => {
        console.log(newNote)
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({note: {content: newNote}})
            })
    .then(response => response.json())
    .then(payload => {
        console.log(payload)
    })
    .catch(errors => {
        console.error(errors)
    })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <RichTextEditor value={newNote} onChange={setNewNote} />
                <Button type='submit'>Submit</Button>
            </Stack>
        </form>
    )
}
