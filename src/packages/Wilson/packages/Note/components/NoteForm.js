import React, {useState} from 'react'

import { Stack, TextInput, Button } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';

export default function NoteForm(props) {

    const [title, setTitle] = useState(props.note.title);
    const [content, setContent] = useState(props.note.content);

    return (
        <form onSubmit={(e) => props.handleSubmit(e, {title, content})}>
            <Stack spacing="xs">
                <TextInput
                    placeholder="Title"
                    label="Note Title"
                    radius="xs"
                    value={title}
                    required
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <RichTextEditor name="content" value={content} onChange={setContent} />
                <Button type='submit'>Submit</Button>
            </Stack>
        </form>
    )
}
