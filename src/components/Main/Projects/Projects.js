import React, {useState, useEffect} from 'react'
import './Projects.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Project from './Project';

export default function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (props.userId) {
            fetchProjects()
        }
    }, []);

    const fetchProjects = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            }
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setProjects(payload.projects)
            } else {
                console.error("Something went wrong")
            }
        })
        .catch(errors => console.error("Something went wrong...", errors))
    }

    const renderProjects = () => {
        if (projects.length > 0) {
            return projects.map(project => {
                return <Project 
                        id={project.id} 
                        key={project.id} 
                        title={project.title}
                        setViewToShow={props.setViewToShow}
                        />
            })
        } else {
            return (
                <p>No Projects</p>
            )
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col id="projects-container">
                    <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={3}>
                        {renderProjects()}
                    </Row>
                </Col>
            </Row>            
        </Container>

    )
}
