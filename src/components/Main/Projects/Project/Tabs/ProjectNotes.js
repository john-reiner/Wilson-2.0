import React from 'react'
import Note from './Note'

export default function ProjectNotes(props) {

  const renderNotes = () => {
    if (props.notes.length > 0) {
        return props.notes.map(note => {
            return <Note 
                        title={note.title}
                    />
        })
    } else {
        return (
            <p>No Projects</p>
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
