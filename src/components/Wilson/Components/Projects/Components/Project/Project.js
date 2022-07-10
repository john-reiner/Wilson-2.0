import React, {useState, useEffect} from 'react'
import { Divider } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import ProjectInfoContainer from './Containers/ProjectInfoContainer';
import Features from '../../../Features/Features';
import NotesContainer from '../../../Notes/Containers/NotesContainer';
import DeleteProjectModal from './Components/ConfirmDeleteProject';
import ListsContainer from '../../../Lists/Containers/ListsContainer';
import MainContainerHeader from '../../../../Containers/MainContainer/MainContainerHeader';
import ProjectModal from './Containers/ProjectModal';

export default function ProjectShow(props) {

    const [projectContent, setProjectContent] = useState("Info");
    const [project, setProject] = useState({});
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState("");
    const [featureTitle, setFeatureTitle] = useState("");
    const [featureId, setFeatureId] = useState(null);
    
    const [opened, handlers] = useDisclosure(false);

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
        setModalOpen(true)
        setModalOptions("Edit")
    }
    const handleDeleteClick = () => {
        setModalOpen(true)
        setModalOptions("Delete")
    }

    let projectComponents = [
        [<ProjectInfoContainer 
            setFetchAgainFlag={setFetchAgainFlag} 
            userId={props.user_id} 
            projectId={project.id} 
            editType="info" 
            title={project.title} 
            github_url={project.github_url} 
            public={project.public} 
            description={project.description} 
        />, "Info"],
        [<ListsContainer
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
            setFeatureId={setFeatureId}

        />, "Features"],      
        [<NotesContainer
            id={props.id}
            notable="projects"
        />, "Notes"],
        // [<Feature
        //     projectId={project.id}
        //     userId={props.userId}
        //     featureId={featureId}
        //     setFeatureTitle={setFeatureTitle}
        // />, "Feature"]
    ]

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    return (
        <div>
            <ProjectModal 
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                modalOptions={modalOptions}
                id={project.id}
                project={project}
                setFetchAgainFlag={setFetchAgainFlag}
                setViewToShow={props.setViewToShow}
            />
            <MainContainerHeader 
                title={project.title}
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