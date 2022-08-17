import React, {useState, useEffect} from 'react'

import { Button, Grid } from '@mantine/core';

import NewNoteModal from './containers/NewNoteModal';

import Note from '../Note/Note'
import { NotesComponentsInterface, NoteType } from './noteTypes';
import DisplayAllLinks from '../global/containers/DisplayAllLinks/DisplayAllLinks';

interface NotesProps {
    route: string
}

export default function Notes({
    route
}: NotesProps) {

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [newNoteOpen, setNewNoteOpen] = useState(false);
    const [fetchFlag, setFetchFlag] = useState(true);
    const [noteShowId, setNoteShowId] = useState<number | null>(null);
    const [optionsToShow, setOptionsToShow] = useState<keyof NotesComponentsInterface>('notes');

    useEffect(() => {
        if (fetchFlag) {
            fetchNotes()
            setFetchFlag(false)      
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFlag]);

    const handleNewNoteOpen = () => setNewNoteOpen(true)

    const fetchNotes = () => {
        fetch(route, {
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
        notes:<DisplayAllLinks
                displayItem={"note"}
                data={notes}
                linkClick={handleLinkClick}
                status={false}
            />,
        note: <Note 
                    route={`${route}${noteShowId}`}
                    setFetchFlag={setFetchFlag}
                    setOptionsToShow={setOptionsToShow}
                />
    }

    const render = (
        key: keyof NotesComponentsInterface
    ) => notesComponents[key]

    return (
        <div>
            <NewNoteModal
                opened={newNoteOpen}
                setOpened={setNewNoteOpen}
                setNotes={setNotes}
                notes={notes}
                route={route}
            />
            <Grid>
                <Grid.Col>        
                    <Button
                        onClick={handleNewNoteOpen}
                    >
                        New Note
                    </Button>
                </Grid.Col>
                <Grid.Col>
                    {render(optionsToShow)}
                </Grid.Col>
            </Grid>
        </div>
    )
}
