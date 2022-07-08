import React, {useState} from 'react'
import { Card, Stack, Textarea, Text, Button, Grid } from '@mantine/core';

import Note from './Note'

export default function ProjectNotes(props) {

  const [newNote, setNewNote] = useState({
      content: "",
  });

  const handleChange = e => setNewNote({...newNote, [e.target.name]:e.target.value})

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/notes`, {
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
            setNewNote(
                {
                    content: "",
                }
                )
            props.setFetchAgainFlag(true)
        }
    })
    .catch(errors => {
        console.error(errors)
    })
  }

  const renderNotes = () => {
    if (props.notes) {
        return props.notes.map(note => {
            return <Note
                      title={note.title}
                      content={note.content}
                      key={note.id}
                      created={note.created}
                      id={note.id}
                      setFetchAgainFlag={props.setFetchAgainFlag}
                      projectId={props.projectId}
                    />
        })
    } else {
        return (
          <p>No Notes</p>
        )
    }
  }

  return (
    <Grid>
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
      {renderNotes()}
      {/* {newNoteFormShow ? <NewNote setFetchAgainFlag={props.setFetchAgainFlag} setNewNoteFormShow={setNewNoteFormShow} userId={props.userId} projectId={props.projectId}/> : <div id="new-note-button" onClick={() => setNewNoteFormShow(true)}>New Note</div>}
      {!newNoteFormShow && renderNotes()} */}
    </Grid>
  )
}
