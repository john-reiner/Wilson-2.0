import React, {useState} from 'react'

import { Stack, TextInput, Button } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { NoteComponentsInterface, NoteType } from '../../Notes/noteTypes';

interface NoteFormProps {
    note: NoteType
    setNote: React.Dispatch<React.SetStateAction<NoteType>>
    route: string
    setNoteComponentKey: React.Dispatch<React.SetStateAction<keyof NoteComponentsInterface>>
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function NoteForm({
    note,
    setNote,
    route,
    setNoteComponentKey,
    handleChange
}: NoteFormProps) {

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const handleTitleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setTitle(e.target.value)

    const updateNote = (
        e: React.FormEvent<HTMLFormElement>,
        ) => {
        e.preventDefault()
        fetch(route, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({note: {
                    title: title,
                    content: content
                }})
                })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            setNote(payload)
            setNoteComponentKey("content")
        })
        .catch(errors => {
            console.error(errors)
        })
        
    }

    console.log(route)
    
    return (
        <form onSubmit={updateNote}>
            <Stack spacing="xs">
                <TextInput
                    placeholder="Title"
                    label="Note Title"
                    radius="xs"
                    value={title}
                    required
                    name="title"
                    onChange={handleTitleChange}
                    />
                <RichTextEditor  value={content} onChange={setContent} />
                <Button type='submit'>Submit</Button>
            </Stack>
        </form>
    )
}
