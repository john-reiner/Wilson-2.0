import React, {useState, useEffect} from 'react'
import { Grid } from '@mantine/core';

import NewNote from '../Components/NewNote';

import NoteContainer from './NoteContainer'

export default function ProjectNotes(props) {

    const [notes, setNotes] = useState([]);
    const [fetchFlag, setFetchFlag] = useState(true);

    useEffect(() => {
        if (fetchFlag) {
            fetchNotes()
            setFetchFlag(false)      
        }
    }, [fetchFlag]);

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
            setNotes(payload.notes)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderNotes = () => {
        if (notes.length > 0) {
            return notes.map(note => {
                return <NoteContainer
                            note={{...note}}
                            id={note.id}
                            notableId={props.id}
                            notable={props.notable}
                            setFetchFlag={setFetchFlag}
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
        <NewNote 
            notable={props.notable}
            projectId={props.id}
            setNotes={setNotes}
            notes={notes}
        />
        {renderNotes()}
        {/* {newNoteFormShow ? <NewNote setFetchAgainFlag={props.setFetchAgainFlag} setNewNoteFormShow={setNewNoteFormShow} userId={props.userId} projectId={props.projectId}/> : <div id="new-note-button" onClick={() => setNewNoteFormShow(true)}>New Note</div>}
        {!newNoteFormShow && renderNotes()} */}
        </Grid>
    )
}
