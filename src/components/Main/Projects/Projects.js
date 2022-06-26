import React, {useState, useEffect} from 'react'
import { Container, Title, Text, Table, Group, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import ProjectLink from './ProjectLink';

export default function Projects(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.userId}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setProjects(payload)
            } else {
                console.error("Something went wrong")
            }
        })
        .catch(errors => console.error("Something went wrong...", errors))
    }

    const renderProjects = () => {
        if (projects.projects) {
            return projects.projects.map(project => {
                return <ProjectLink 
                            id={project.id} 
                            key={project.id} 
                            title={project.title}
                            setViewToShow={props.setViewToShow}
                            handleProjectShow={props.handleProjectShow}
                            author={project.author_first + " " + project.author_last}
                            modified={project.modified}
                            created={project.created}
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
            <Group position="apart">
                <div>
                    <Title
                        order={2} 
                        className="wilson-logo-small"
                    >
                        Projects
                    </Title>
                    <Text 
                        weight={700}
                    >
                        {projects.projects_total+ " Total"}
                    </Text>
                </div>
                <div>
                    <Button 
                        onClick={() => props.setViewToShow(2)} 
                        leftIcon={<Plus size={14} />}
                    >
                        New Project
                    </Button>
                </div>
            </Group>
            <hr></hr>
            <Table 
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Modified</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProjects()}
                </tbody>
            </Table>
        </div>
    )
}