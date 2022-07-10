import React, {useState} from 'react'
import { Paper, Group, Badge, Stack, Text, ActionIcon, Grid, Textarea, Button, Divider } from '@mantine/core';
import { Trash, Edit, ArrowBackUp } from 'tabler-icons-react';
import NoteNavBar from './NoteNavBar';

export default function Note(props) {

    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState({
        content: props.content
    });

    const handleChange = e => setNote({...note, [e.target.name]:e.target.value})

    const convertDate = () => {
        var date =  new Date(props.created)
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }


    const deleteNote = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/notes/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                props.setFetchAgainFlag(true)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.notableId}/notes/${props.id}`, {
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
                props.setFetchAgainFlag(true)
                setEdit(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }



    const renderEditForm = editFlag => {
        if (editFlag) {
            return (
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <Textarea
                            placeholder="Note..."
                            minRows={2}
                            name="content"
                            value={props.note.content}
                            onChange={handleChange}
                            required
                        />
                        <Button type='submit' variant="outline" color="blue" fullWidth>
                            Submit
                        </Button>
                    </Stack>
                </form>
            )
        }
        return (
            <div>
                <Group position="apart">
                    <Text weight={500} align="left">{props.note.title}</Text>
                    {/* <Badge color="blue" variant="light">
                    {convertDate()}
                    </Badge> */}
                </Group>
                
                <Text>{props.note.content}</Text>
            </div>
        )
    }

    return (
        <Grid.Col 
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
        >
            <Paper
                withBorder
                shadow="md" 
                // p="sm"
            >
                <NoteNavBar 
                    deleteNote={deleteNote}
                    edit={edit}
                    setEdit={setEdit}
                />
                {renderEditForm(edit)}
            </Paper>
        </Grid.Col>
    )
}
