import React, {useState, useEffect} from 'react'

import { Divider } from '@mantine/core';

import ProjectInfoContainer from './containers/ProjectInfoContainer';
import Features from '../Features';
import Notes from '../Notes';
import Lists from '../Lists';
import MainContainerHeader from '../global/MainContainerHeader';
import EditProjectModal from './containers/EditProjectModal';
import DeleteModalConfirmation from '../global/DeleteModalConfirmation';

export default function ProjectContainer(props) {

    const [projectContent, setProjectContent] = useState("Info");
    const [project, setProject] = useState({});
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const fetchProject = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.id}`)
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

    const renderContent = (tabsArray, name) => tabsArray.find(tabTuple => tabTuple[1] === name)[0]

    const handleTabClick = (tabName) => {
        setProjectContent(tabName)
    }

    const handleEditProjectClick = () => {
        setEditModalOpen(true)
    }
    const handleDeleteClick = () => setDeleteModalOpen(true)

    const handleDeleteProject = () => {
        props.setViewToShow(0)
    }

    let projectComponents = [
        [<ProjectInfoContainer 
            setFetchAgainFlag={setFetchAgainFlag} 
            project={{...project}}
        />, "Info"],
        [<Lists
            title={project.title}
            projectId={props.id}
            userId={props.userId}
            listable="projects"
            id={project.id}

        />, "Lists"],
        [<Features 
            setFetchAgainFlag={setFetchAgainFlag} 
            projectId={props.id} 
            userId={props.userId} 
            features={project.features}

        />, "Features"],      
        [<Notes
            id={props.id}
            notable="projects"
        />, "Notes"],
    ]

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    return (
        <div>
            <EditProjectModal 
                setModalOpen={setEditModalOpen}
                modalOpen={editModalOpen}
                id={project.id}
                project={project}
                setFetchAgainFlag={setFetchAgainFlag}
                setViewToShow={props.setViewToShow}
            />
            <DeleteModalConfirmation 
                route={`projects/${props.id}`}
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