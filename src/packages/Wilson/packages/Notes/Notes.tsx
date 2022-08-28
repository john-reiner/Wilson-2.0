import React, {useState, useEffect} from 'react'

import { Button, Grid, Paper } from '@mantine/core';

import Note from '../Note/Note'
import { NotesComponentsInterface, NoteType } from './noteTypes';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';
import { Plus } from 'tabler-icons-react';
import NewNoteEditor from './containers/NewNoteEditor';
import InfoContainer from '../global/InfoContainer';

interface NotesProps {
    route: string
    color?: string
    colorName?: string
}

export default function Notes({
    route,
    color,
    colorName
}: NotesProps) {

    
    
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [fetchFlag, setFetchFlag] = useState(true);
    const [noteShowId, setNoteShowId] = useState<number | null>(null);
    const [optionsToShow, setOptionsToShow] = useState<keyof NotesComponentsInterface>('notes');
    
    const notesRoute = `${route}/notes`
    const noteRoute = `${notesRoute}/${noteShowId}`
    
    useEffect(() => {
        if (fetchFlag) {
            fetchNotes()
            setFetchFlag(false)      
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFlag]);

    const fetchNotes = () => {
        fetch(notesRoute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setNotes(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleLinkClick = (
        id: number
    ) => {
        setNoteShowId(id)
        setOptionsToShow("note")
    }

    const notesComponents = {
        new: <NewNoteEditor
                setNotes={setNotes}
                notes={notes}
                route={notesRoute}
                color={colorName}
            />,
        notes:<DisplayAllLinks
                displayItem={"note"}
                data={notes}
                linkClick={handleLinkClick}
                status={false}
                color={color}
            />,
        note: <Note 
                    route={noteRoute}
                    setFetchFlag={setFetchFlag}
                    setOptionsToShow={setOptionsToShow}
                />
    }

    const render = (
        key: keyof NotesComponentsInterface
    ) => notesComponents[key]

    return (
        <Grid>
            {/* {newNoteOpen && 
                <NewNoteModal
                    opened={newNoteOpen}
                    setOpened={setNewNoteOpen}
                    setNotes={setNotes}
                    notes={notes}
                    route={notesRoute}
                />
            } */}
                <Grid.Col
                    xs={3}
                >
                    <InfoContainer
                        color={color}
                        render={
                            <Paper
                                withBorder
                                p={"xs"}
                                style={{
                                    height: "100%"
                                }}
                            >
                                <Button
                                    fullWidth
                                    size='xs'
                                    color={colorName}
                                    leftIcon={<Plus size={14} />}
                                    onClick={() => setOptionsToShow("new")}
                                >
                                    New Note
                                </Button>
                            </Paper>
                        }
                    />
                </Grid.Col>
                <Grid.Col
                    xs={9}
                >
                    {render(optionsToShow)}
                </Grid.Col>
            </Grid>
    )
}
