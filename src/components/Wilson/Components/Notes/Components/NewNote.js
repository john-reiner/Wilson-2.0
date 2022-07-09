import React, {useState} from 'react'

export default function NewNote(props) {
    
    const [newNote, setNewNote] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project_note: newNote})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setNewNote(
                    {
                        title: "",
                        content: "",
                    }
                    )
                props.setFetchAgainFlag(true)
                props.setNewNoteFormShow(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = e => setNewNote({...newNote, [e.target.name]:e.target.value})

    return (
        <div id="new-feature-container">
            <h2 id="new-feature-title">Create a New Feature Request</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: 
                    <input type="text" name="title" value={newNote.title} onChange={handleChange}/>
                </label>
                <br></br>
                <label>
                    Content: 
                    <textarea type="text" name="content" value={newNote.description} onChange={handleChange} />
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
