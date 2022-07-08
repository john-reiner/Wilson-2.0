import React, {useState, useEffect} from 'react'
import { Title, Text, Table, Group, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import ProjectLink from '../Components/ProjectLink';

export default function ProjectsContainer(props) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(props.projects)
    }, [props.projects]);

    const renderProjects = () => {
        if (projects) {
            return projects.map(project => {
                return (
                    <ProjectLink 
                        id={project.id} 
                        key={project.id} 
                        title={project.title}
                        setViewToShow={props.setViewToShow}
                        handleProjectShow={props.handleProjectShow}
                        author={project.author_first + " " + project.author_last}
                        modified={project.modified}
                        created={project.created}
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
                        {props.projectsTotal+ " Total"}
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