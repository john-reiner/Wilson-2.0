import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import useFetch from '../../../hooks/useFetch';


export default function ProjectShow(props) {

    // const [project, setProject] = useState(null);

    const [{requestedData: project, errors, loading}, goFetch] = useFetch("")

    useEffect(() => {
        if (props.id && props.userId) {
            goFetch(`http://localhost:3001/api/v2/users/${props.userId}/projects/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                }
            })
        }
    }, [props.id, props.userId]);

    useEffect(() => {
        if (project.title) {
            props.setProjectTitle(project.title)
        }
    }, [project]);

    return (
        <Container fluid>
            <Row>
                <Col id="project-show-container">
                    {project.title}
                </Col>
            </Row>
        </Container>
    )
}
