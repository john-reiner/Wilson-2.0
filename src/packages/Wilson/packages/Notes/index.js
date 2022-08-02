import React, {useState, useEffect} from 'react'

import { Button, Grid, TypographyStylesProvider } from '@mantine/core';

import NewNoteModal from './containers/NewNoteModal';

import Note from '../Note'

export default function Notes(props) {

    const [notes, setNotes] = useState([]);
    const [newNoteOpen, setNewNoteOpen] = useState(false);
    const [fetchFlag, setFetchFlag] = useState(true);

    console.log(notes)

    useEffect(() => {
        if (fetchFlag) {
            fetchNotes()
            setFetchFlag(false)      
        }
    }, [fetchFlag]);

    const handleNewNoteOpen = () => setNewNoteOpen(true)

    const fetchNotes = () => {
        fetch(`http://localhost:3001/api/v2/${props.notable}/${props.id}/notes`, {
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

    const renderNotes = () => {
        if (notes.length > 0) {
            return notes.map(note => {
                return (
                    <Note
                                note={{...note}}
                                key={note.id}
                                notableId={props.id}
                                notable={props.notable}
                                setFetchFlag={setFetchFlag}
                            />
                    )
            })
        } else {
            return (
            <p>No Notes</p>
            )
        }
    }

    return (
        <Grid>
            <Grid.Col>        
                <NewNoteModal
                    opened={newNoteOpen}
                    setOpened={setNewNoteOpen}
                    notable={props.notable}
                    notableId={props.id}
                    setNotes={setNotes}
                    notes={notes}
                />
            </Grid.Col>

        <Button
            onClick={handleNewNoteOpen}
        >
            New Note
        </Button>

        {/* <NewNote 
            notable={props.notable}
            projectId={props.id}
            setNotes={setNotes}
            notes={notes}
        /> */}
        {renderNotes()}
        </Grid>
    )
}
