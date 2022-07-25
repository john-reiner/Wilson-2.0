import React, {useState} from 'react'

import { Card, Stack, Textarea, Text, Button, Grid } from '@mantine/core';

export default function NewNote(props) {

    const [newNote, setNewNote] = useState({
        content: "",
    });

    const handleChange = e => setNewNote({...newNote, [e.target.name]:e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.projectId}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({note: newNote})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                props.setNotes([...props.notes, payload.note])
                setNewNote(
                    {
                        content: "",
                    }
                )

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
            <Card 
            shadow="sm" 
            p="sm"
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[4],
                })
            }
            >

            <Text weight={500} align="center">New Note</Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing="md">
                <Textarea
                    placeholder="Note..."
                    minRows={2}
                    name="content"
                    value={newNote.content}
                    onChange={handleChange}
                    required
                />
                <Button type='submit' variant="outline" color="blue" fullWidth>
                    Submit
                </Button>
                </Stack>
            </form>
            </Card>
        </Grid.Col>
    )
}
