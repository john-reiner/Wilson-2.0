import React, {useState, useEffect} from 'react'

import { Button, Grid, TypographyStylesProvider } from '@mantine/core';

import NewNoteModal from './containers/NewNoteModal';

import Note from '../Note'
// import AllNotes from './containers/AllNotes';
import DisplayAllLinks from '../global/containers/DisplayAllLinks';
import NoteLink from './components/NoteLink';

export default function Notes(props) {

    const [notes, setNotes] = useState([]);
    const [newNoteOpen, setNewNoteOpen] = useState(false);
    const [fetchFlag, setFetchFlag] = useState(true);
    const [noteShowId, setNoteShowId] = useState(null);
    const [optionsToShow, setOptionsToShow] = useState('notes');

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

    const handleLinkClick = (id) => {
        setNoteShowId(id)
        setOptionsToShow("note")
    }

    const renderOptions = {
        notes: <DisplayAllLinks
                    displayItem={"Notes"}
                    count={notes.length}
                    data={notes}
                    linkClick={handleLinkClick}
                    status={false}
                />,
        note: <Note 
                    id={noteShowId}
                    notable={'projects'}
                    notableId={props.id}
                    setFetchFlag={setFetchFlag}
                    setOptionsToShow={setOptionsToShow}
                />
    }

    const render = (options) => options[optionsToShow]



    return (
        <div>
            <NewNoteModal
                opened={newNoteOpen}
                setOpened={setNewNoteOpen}
                notable={props.notable}
                notableId={props.id}
                setNotes={setNotes}
                notes={notes}
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
                    {render(renderOptions)}
                </Grid.Col>
            </Grid>
        </div>
    )
}
