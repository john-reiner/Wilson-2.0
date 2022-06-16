import React, {useState} from 'react'

export default function NewFeature() {

    const [newFeature, setNewFeature] = useState({
        title: "",
        description: "",
        due_date: "",
        public: 'false',
    });

    const handleSubmit = e => {
        e.preventDefault()
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
