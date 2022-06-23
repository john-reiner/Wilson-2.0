import React, {useState} from 'react'
import NewNote from './NewNote';
import Note from './Note'

export default function ProjectNotes(props) {

  const [newNoteFormShow, setNewNoteFormShow] = useState(false);

  const renderNotes = () => {
    if (props.notes) {
        return props.notes.map(note => {
            return <Note
                      title={note.title}
                      content={note.content}
                      key={note.id}
                      created={note.created}
                    />
        })
    } else {
        return (
          <p>No Notes</p>
        )
    }
  }

  return (
    <div>
      {newNoteFormShow ? <NewNote setFetchAgainFlag={props.setFetchAgainFlag} setNewNoteFormShow={setNewNoteFormShow} userId={props.userId} projectId={props.projectId}/> : <div id="new-note-button" onClick={() => setNewNoteFormShow(true)}>New Note</div>}
      {!newNoteFormShow && renderNotes()}
    </div>
  )
}
