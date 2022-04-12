import React, {useState, useEffect} from 'react'
import useFetch from '../../../../hooks/useFetch'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function NewProject(props) {

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        github_url: "",
        public: false,
    });

    const [{response, errors, loading}, goFetch] = useFetch("")

    useEffect(() => {
        if (response || errors) {
            if (response) {
                props.setViewToShow(1)
                setNewProject({
                    title: "",
                    description: "",
                    github_url: "",
                    public: false,
                })
            }         
        }
    }, [response, errors]);
    
    const handleChange = e => setNewProject({...newProject, [e.target.name]:e.target.value})
    const handlePublicTrue = () => setNewProject({...newProject, public: true})
    const handlePublicFalse = () => setNewProject({...newProject, public: false})
    
    const handleSubmit = e => {
        e.preventDefault()
        goFetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({project: newProject})
            })
    }

    console.log(errors)

    return (
        <Container>

            <Row>

                <Col className="mt-5 form-container">
                    <Form onSubmit={handleSubmit}>
                        <h4>Create a New Project</h4>
                        <small>Configure your new projects basic settings. Click next to add more options.</small>
                        <hr></hr>
                        {(errors && errors.title) ? <small style={{color: "red"}}>{errors.title[0]}</small> : null}
                        <FloatingLabel controlId="floatingTextarea" label="Project Title" className="mb-3">
                            <Form.Control placeholder="Title" name="title" onChange={handleChange} value={newProject.title}/>
                        </FloatingLabel>
                        {(errors && errors.description) ? <small style={{color: "red"}}>{errors.title[0]}</small> : null}
                        <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }}
                                name="description"
                                onChange={handleChange}
                                value={newProject.description}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea" label="GitHub URL" className="mb-3">
                            <Form.Control placeholder="Github" name="github_url" onChange={handleChange} value={newProject.github_url}/>
                        </FloatingLabel>
                        <div>
                            <Form.Check
                                type={'radio'}
                                label={"Public"}
                                name="public"
                                className="mb-3"
                                onChange={handlePublicTrue}
                                value={true}
                                checked={newProject.public}
                                style={{color: "#fff"}}
                            />
                            <Form.Check
                                type={'radio'}
                                label={"Private"}
                                name="public"
                                className="mb-3"
                                
                                onChange={handlePublicFalse}
                                value={false}
                                checked={!newProject.public}
                                // style={{color: "red"}}
                            />
                        </div>

                        {loading ? <Button variant="secondary" disabled >Loading...</Button> : <Button variant="secondary" type="submit">Next</Button>}
                    </Form>

                </Col>
            </Row>

        </Container>
    )
}
