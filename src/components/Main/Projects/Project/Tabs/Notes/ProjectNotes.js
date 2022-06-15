import React from 'react'
import Note from './Note'

export default function ProjectNotes(props) {

  const renderNotes = () => {
    if (props.notes.length > 0) {
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
      <div id="new-note-button">New Note</div>
      {renderNotes()}
    </div>
  )
}
