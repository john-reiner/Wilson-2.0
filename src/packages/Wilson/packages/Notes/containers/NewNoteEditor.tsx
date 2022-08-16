import React, {useState} from 'react'
import { RichTextEditor } from '@mantine/rte';
import { Button, Stack, TextInput } from '@mantine/core';
import { NoteType } from '../noteTypes';

interface NewNoteEditorProps {
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
    notes: NoteType[]
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    route: string
}

export default function NewNoteEditor({
    setNotes,
    notes,
    setOpened,
    route
}: NewNoteEditorProps) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault()
        fetch(route, {
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
            setOpened(false)
            setNotes([...notes, payload])
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
