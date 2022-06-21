import React, {useState} from 'react'
import './NewProject.css'


export default function NewProject(props) {

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        public: 'false',
    });
    
    const handleChange = e => setNewProject({...newProject, [e.target.name]:e.target.value})
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({project: newProject})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setNewProject(
                    {
                        title: "",
                        description: "",
                        github_url: "",
                        public: 'false',
                    }
                )
                props.handleProjectShow(payload.message.id)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }
    
    return (
        <div id="new-project-container">
            <div id="new-project-heading">
                <h2>Create a New Project</h2>
                <div id="back-button" onClick={() => props.setViewToShow(0)}>Back</div>
            </div>
            <div className="new-project-form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Title: 
                        <input type="text" name="title" value={newProject.title} onChange={handleChange}/>
                    </label>
                    <label>
                        Description: 
                        <textarea type="text" name="description" value={newProject.description} onChange={handleChange} />
                    </label>
                    <label>
                        Github URL: 
                        <input type="text" name="github_url" value={newProject.github_url} onChange={handleChange} />
                    </label>
                    <label>
                        Public:
                        <select name="public" value={newProject.public} onChange={handleChange}>
                            <option value={true}>Public</option>
                            <option value={false}>Private</option>
                        </select>
                        {/* <input type="text" name="public" value={newProject.public} onChange={handleChange} /> */}
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}



// {(errors && errors.title) ? <small style={{color: "red"}}>{errors.title[0]}</small> : null}
// <FloatingLabel controlId="floatingTextarea" label="Project Title" className="mb-3">
//     <Form.Control placeholder="Title" name="title" onChange={handleChange} value={newProject.title}/>
// </FloatingLabel>
// {(errors && errors.description) ? <small style={{color: "red"}}>{errors.title[0]}</small> : null}
// <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
//     <Form.Control
//         as="textarea"
//         placeholder="Description"
//         style={{ height: '100px' }}
//         name="description"
//         onChange={handleChange}
//         value={newProject.description}
//     />
// </FloatingLabel>
// <FloatingLabel controlId="floatingTextarea" label="GitHub URL" className="mb-3">
//     <Form.Control placeholder="Github" name="github_url" onChange={handleChange} value={newProject.github_url}/>
// </FloatingLabel>
// <div>
//     <Form.Check
//         type={'radio'}
//         label={"Public"}
//         name="public"
//         className="mb-3"
//         onChange={handlePublicTrue}
//         value={true}
//         checked={newProject.public}
//         style={{color: "#fff"}}
//     />
//     <Form.Check
//         type={'radio'}
//         label={"Private"}
//         name="public"
//         className="mb-3"
        
//         onChange={handlePublicFalse}
//         value={false}
//         checked={!newProject.public}
//         // style={{color: "red"}}
//     />
// </div>

// {loading ? <Button variant="secondary" disabled >Loading...</Button> : <Button variant="secondary" type="submit">Next</Button>}
// </Form>

// </Col>
// </Row>

// </Container>