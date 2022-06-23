import React, {useState} from 'react'
import { TextInput, Container, Group, Title, Textarea, Button, Stack, Switch } from '@mantine/core';
import { ArrowBackUp, BrandGithub } from 'tabler-icons-react';


export default function NewProject(props) {

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        public: false,
    });
    
    const handleChange = e => setNewProject({...newProject, [e.target.name]:e.target.value})
    const togglePublic = e => {
        setNewProject({...newProject, [e.target.name]:e.target.checked})
    }
    
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

    console.log(newProject)


    
    return (
        <Container id="new-project-container">
            <Group position="apart">
                <div>
                    <Title order={2} className="wilson-logo-small">Create a Project</Title>
                </div>
                <div>
                    <Button onClick={() => props.setViewToShow(0)} leftIcon={<ArrowBackUp size={14} />}>
                        Back
                    </Button>
                </div>
            </Group>
            <hr></hr>

                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            placeholder="Example Project..."
                            label="Project Name"
                            required
                            name="title" 
                            value={newProject.title} 
                            onChange={handleChange}
                        />
                        <Textarea
                            placeholder="Description..."
                            label="Project Description"
                            name="description" 
                            value={newProject.description} 
                            onChange={handleChange}
                        />
                        <TextInput 
                            label="GitHub URL" 
                            placeholder="github" 
                            icon={<BrandGithub size={14} />} 
                            name="github_url" 
                            value={newProject.github_url} 
                            onChange={handleChange}

                            />
                        <Switch
                            label="Public"
                            name="public" 
                            value={newProject.public}
                            onChange={togglePublic}
                            // checked={newProject.public}
                        />
                        <Button
                            type="submit"
                            fullWidth 
                            variant="outline"
                        >
                            Submit
                        </Button>
                    </Stack>
                    {/* <label>
                        Title: 
                        <input type="text" name="title" value={newProject.title} onChange={handleChange}/>
                    </label> */}
                    {/* <label>
                        Description: 
                        <textarea type="text" name="description" value={newProject.description} onChange={handleChange} />
                    </label> */}
                    {/* <label>
                        Github URL: 
                        <input type="text" name="github_url" value={newProject.github_url} onChange={handleChange} />
                    </label> */}
                    {/* <label>
                        Public:
                        <select name="public" value={newProject.public} onChange={handleChange}>
                            <option value={true}>Public</option>
                            <option value={false}>Private</option>
                        </select> */}
                        {/* <input type="text" name="public" value={newProject.public} onChange={handleChange} /> */}
                    {/* </label> */}
                    {/* <input type="submit" value="Submit" /> */}
                </form>

        </Container>
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