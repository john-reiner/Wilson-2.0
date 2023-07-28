import React, {useState, useEffect} from 'react'
import { ProjectInterface, ProjectComponents } from '../global/interfaces/projectInterfaces';

import { Box, Divider, Space, Tabs, useMantineTheme } from '@mantine/core';

import ProjectInfoContainer from './containers/ProjectInfoContainer';
import Features from '../Features/Features';
import Notes from '../Notes/Notes';
import Lists from '../Lists/Lists';
import MainContainerHeader from '../global/MainContainerHeader';
import EditProjectModal from './containers/EditProjectModal';
import DeleteModalConfirmation from '../global/DeleteModalConfirmation';
import { InfoSquare, ListCheck, Stars } from 'tabler-icons-react';
import {Notes as NotesIcon } from 'tabler-icons-react'

interface ProjectProps {
    id: number
    setViewToShow: React.Dispatch<React.SetStateAction<number>>
    route: string
}

export default function Project({
    id,
    setViewToShow,
    route
}: ProjectProps) {

    
    const theme = useMantineTheme();
    
    const [projectContent, setProjectContent] = useState<keyof ProjectComponents>("info");
    const [project, setProject] = useState<ProjectInterface>({
        id: 0,
        title: "",
        description: "",
        github_url: "",
        image: "",
        author: {
            initials: "",
            full_name: "",
        }
        
    });
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    
    const fetchProject = () => {
        fetch(`http://localhost:3001/api/v2/projects/${id}`)
        .then(response => response.json())
        .then(payload => {
            setProject(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }
    
    useEffect(() => {
        fetchProject()
        setFetchAgainFlag(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [fetchAgainFlag]);


const handleTabClick = (
    tabName: keyof ProjectComponents
    ) => {
        setProjectContent(tabName)
    }
    
    const handleEditProjectClick = () => {
        setEditModalOpen(true)
    }
    const handleDeleteClick = () => setDeleteModalOpen(true)
    
    const handleDeleteProject = () => {
        setViewToShow(0)
    }
    
    
    let projectComponents = {
        "info": <ProjectInfoContainer 
            project={{...project}}
        />,
        "lists": <Lists
            color={project.color}
            colorName={project.color_name}
            route={route}
        />,
        "features": <Features
            route={route}
            color={project.color}
            colorName={project.color_name}
        />,
        "notes": <Notes
            route={route}
            color={project.color}
            colorName={project.color_name}
        />
    }
    
    const renderContent = (
        componentsObject: ProjectComponents,
        name: keyof ProjectComponents
        ) => componentsObject[name]
        
    const handleTabChange = (e: keyof ProjectComponents) => {
        setProjectContent(e)
    }

    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing.xs,
                border: `solid 1px ${project.color}`,
                height: "89.6vh"
            })}
        >
            {editModalOpen && 
                <EditProjectModal 
                setModalOpen={setEditModalOpen}
                modalOpen={editModalOpen}
                project={project}
                setProject={setProject}
                setFetchAgainFlag={setFetchAgainFlag}
                />
            }
            { deleteModalOpen && 
                <DeleteModalConfirmation 
                    route={`projects/${id}`}
                    successFunction={handleDeleteProject}
                    opened={deleteModalOpen}
                    setOpened={setDeleteModalOpen}
                    item="Project"
                />
            }
            <MainContainerHeader
                color={project.color}
                title={project.title}
                handleEditClick={handleEditProjectClick}
                handleDeleteClick={handleDeleteClick}
                // tabs={projectShowTabs}
                type="Project"
            />
                <Space my="sm" />
                <Tabs 
                    color={project.color_name}
                    variant="pills"
                    defaultValue="info"
                    onTabChange={handleTabChange}
                >
                    <Tabs.List
                        position="apart"
                        grow
                    >
                        <Tabs.Tab value="info" icon={<InfoSquare size={20} />}>Info</Tabs.Tab>
                        <Tabs.Tab value="lists" icon={<ListCheck size={20} />}>Lists</Tabs.Tab>
                        <Tabs.Tab value="features" icon={<Stars size={20} />}>Features</Tabs.Tab>
                        <Tabs.Tab value="notes" icon={<NotesIcon size={20} />}>Notes</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={projectContent} pt="xs">
                        {renderContent(projectComponents, projectContent)}
                    </Tabs.Panel>
                </Tabs>

        </Box>
    )
}