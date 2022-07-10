import React from 'react'
import { Stack, Textarea, Button } from '@mantine/core';

export default function NoteForm(props) {

    console.log(props)

    return (
        <form onSubmit={props.handleSubmit}>
            <Stack spacing="xs">
                <Textarea
                    autosize
                    minRows={1}
                    name="content"
                    value={props.content}
                    onChange={props.handleChange}
                    required
                />
                <Button type='submit' variant="outline" color="blue" fullWidth>
                    Submit
                </Button>
            </Stack>
        </form>
    )
}
