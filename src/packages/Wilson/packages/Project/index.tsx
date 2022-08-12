import React, {useState, useEffect} from 'react'
import { ProjectInterface, ProjectComponents } from '../global/interfaces/projectInterfaces';

import { Divider } from '@mantine/core';

import ProjectInfoContainer from './containers/ProjectInfoContainer';
import Features from '../Features';
import Notes from '../Notes';
import Lists from '../Lists';
import MainContainerHeader from '../global/MainContainerHeader';
import EditProjectModal from './containers/EditProjectModal';
import DeleteModalConfirmation from '../global/DeleteModalConfirmation';



interface ProjectProps {
    id: number
    setViewToShow: React.Dispatch<React.SetStateAction<number>>
}

export default function Project({
    id,
    setViewToShow
}: ProjectProps) {

    const [projectContent, setProjectContent] = useState<keyof ProjectComponents>("info");
    const [project, setProject] = useState<ProjectInterface>({
        id: 0,
        title: "",
        description: "",
        github_url: "",
        image: ""

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
    }, [fetchAgainFlag]);

    const renderContent = (
        componentsObject: ProjectComponents,
        name: keyof ProjectComponents
        ) => componentsObject[name]

    const handleTabClick = (tabName: keyof ProjectComponents) => {
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
                projectId={id}
                listable="projects"
            />,
        "features": <Features 
                setFetchAgainFlag={setFetchAgainFlag} 
                projectId={id} 
            />,
        "notes": <Notes
                id={id}
                notable="projects"
            />
    }

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    return (
        <div>
            {editModalOpen && 
                <EditProjectModal 
                    setModalOpen={setEditModalOpen}
                    modalOpen={editModalOpen}
                    project={project}
                    setProject={setProject}
                    setFetchAgainFlag={setFetchAgainFlag}
                />
            }
            <DeleteModalConfirmation 
                route={`projects/${id}`}
                successFunction={handleDeleteProject}
                opened={deleteModalOpen}
                setOpened={setDeleteModalOpen}
                item="Project"
            />
            <MainContainerHeader 
                title={project.title}
                github_url={project.github_url}
                handleTabClick={handleTabClick}
                handleEditClick={handleEditProjectClick}
                handleDeleteClick={handleDeleteClick}
                tabs={projectShowTabs}
                type="Project"
            />
            <Divider my="xs" />

                {renderContent(projectComponents, projectContent)}

        </div>
    )
}