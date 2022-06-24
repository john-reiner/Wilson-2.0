import React, {useState} from 'react'
import { Card, Group, Badge, Stack, Text, ActionIcon, Grid, TextInput, Textarea, Button } from '@mantine/core';
import { Trash, Edit, ArrowBackUp } from 'tabler-icons-react';

export default function Note(props) {

    const [editProjectFlag, setEditProjectFlag] = useState(false);
    const [note, setNote] = useState({
        title: props.title,
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
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}/project_notes/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
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
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}/project_notes/${props.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project_note: note})
                })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "ok") {
                props.setFetchAgainFlag(true)
                setEditProjectFlag(false)
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
                        <TextInput
                            placeholder="Title"
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                        />
                        <Textarea
                            placeholder="Note..."
                            minRows={2}
                            name="content"
                            value={note.content}
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
                    <Text weight={500} align="left">{props.title}</Text>
                    <Badge color="blue" variant="light">
                    {convertDate()}
                    </Badge>
                </Group>
                <hr></hr>
                <Text>{props.content}</Text>
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
            <Card shadow="sm" p="sm">
                <Stack>
                    <Group position="apart">
                    <ActionIcon 
                        color='red'
                        size="xs"
                        onClick={deleteNote}
                    >
                        <Trash />
                    </ActionIcon>
                    {   !editProjectFlag ?
                            <ActionIcon 
                                size="xs"
                            >
                                <Edit 
                                    onClick={() => setEditProjectFlag(true)}
                                />
                            </ActionIcon>
                        :
                            <ActionIcon 
                                size="xs"
                            >
                                <ArrowBackUp 
                                    onClick={() => setEditProjectFlag(false)}
                                />
                            </ActionIcon>
                    }
                    </Group>
                    {renderEditForm(editProjectFlag)}
                </Stack>
            </Card>
        </Grid.Col>
    )
}
