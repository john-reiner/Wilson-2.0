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
      <h2>Notes</h2>
      {renderNotes()}
    </div>
  )
}
