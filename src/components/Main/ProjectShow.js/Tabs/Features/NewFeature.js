import React, {useState} from 'react'

export default function NewFeature(props) {

    const [newFeature, setNewFeature] = useState({
        title: "",
        description: "",
        due_date: "",
        public: 'false',
    });

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.projectId}/features`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({feature: newFeature})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setNewFeature(
                    {
                        title: "",
                        description: "",
                        due_date: "",
                        public: 'false',
                    }
                    )
                props.setFetchAgainFlag(true)
                props.setNewFeatureFormShow(false)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleChange = e => setNewFeature({...newFeature, [e.target.name]:e.target.value})

    return (
        <div id="new-feature-container">
            <h2 id="new-feature-title">Create a New Feature Request</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: 
                    <input type="text" name="title" value={newFeature.title} onChange={handleChange}/>
                </label><br></br>
                <label>
                    Description: 
                    <textarea type="text" name="description" value={newFeature.description} onChange={handleChange} />
                </label><br></br>
                <label>
                    Due: 
                    <input type="date" name="due_date" value={newFeature.due_date} onChange={handleChange} />
                </label><br></br>
                <label>
                    Public:
                    <select name="public" value={newFeature.public} onChange={handleChange}>
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                    </select>
                    {/* <input type="text" name="public" value={newFeature.public} onChange={handleChange} /> */}
                </label><br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
