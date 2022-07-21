import React, {useState, useEffect} from 'react'
import { Title, Text, Group, Button, Divider, Grid } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import ProjectLink from '../Components/ProjectLink';

export default function ProjectsContainer(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = () => {
        fetch(`http://localhost:3001/api/v2/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => setProjects(payload.projects))
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderProjectLinks = () => {
        if (projects) {
            return projects.map(project => {
                return (
                    <ProjectLink 
                        project={{...project}}
                        setViewToShow={props.setViewToShow}
                        handleProjectShow={props.handleProjectShow}
                        author={project.author_first + " " + project.author_last}
                        key={project.id}
                    />                    
                )
            })
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
                        {props.projectsTotal + " Total"}
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
            <Divider my="xs"/>
            <Grid>
                {renderProjectLinks()}
            </Grid>
        </div>
    )
}