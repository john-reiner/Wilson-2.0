import React, {useState} from 'react'
import { RichTextEditor } from '@mantine/rte';
import { Button, Stack, TextInput } from '@mantine/core';
import { NoteType } from '../noteTypes';

interface NewNoteEditorProps {
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>
    notes: NoteType[]
    route: string
    color?: string
}

export default function NewNoteEditor({
    setNotes,
    notes,
    route,
    color
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
                <Button 
                    color={color} 
                    type='submit'
                    variant='outline'
                >Submit</Button>
            </Stack>
        </form>
    )
}
