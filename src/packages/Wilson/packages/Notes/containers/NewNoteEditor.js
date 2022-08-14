import React, {useState} from 'react'
import { RichTextEditor } from '@mantine/rte';
import { Button, Stack, TextInput } from '@mantine/core';

export default function NewNoteEditor(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // const handleNewNoteChange = e => setNewNote({...newNote, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({note: {
                title,
                content
            }})
            })
    .then(response => response.json())
    .then(payload => {
        props.setOpened(false)
        props.setNotes([...props.notes, payload])
    })
    .catch(errors => {
        console.error(errors)
    })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextInput
                    placeholder="Title"
                    label="Note Title"
                    radius="xs"
                    value={title}
                    required
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <RichTextEditor value={content} onChange={setContent} />
                <Button type='submit'>Submit</Button>
            </Stack>
        </form>
    )
}
