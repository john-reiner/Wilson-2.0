import React, {useState, useEffect} from 'react'
import { ProjectInterface } from '../global/interfaces/projectInterfaces';


import { Title, Text, Group, Button, Divider, Grid } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

import ProjectLink from './components/ProjectLink';

interface ProjectsProps {
    setViewToShow: React.Dispatch<React.SetStateAction<number>>,
    handleProjectShow: (id: number) => void,
    route: string
}



export default function Projects({
    setViewToShow,
    handleProjectShow,
    route
}: ProjectsProps) {

    const [projects, setProjects] = useState<ProjectInterface[]>([]);

    useEffect(() => {
        fetchProjects()
    }, []);

    const fetchProjects = () => {
        fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => setProjects(payload))
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderProjectLinks = () => {
        if (projects) {
            return projects.map((project: ProjectInterface) => {
                return (
                    <ProjectLink 
                        project={{...project}}
                        handleProjectShow={handleProjectShow}
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
                        {projects.length + " Total"}
                    </Text>
                </div>
                <div>
                    <Button 
                        onClick={() => setViewToShow(2)} 
                        leftIcon={<Plus size={14} />}
                    >
                        New Project
                    </Button>
                </div>
            </Group>
            <Divider my="xs"/>
            <Grid 
                grow
            >
                {renderProjectLinks()}
            </Grid>
        </div>
    )
}