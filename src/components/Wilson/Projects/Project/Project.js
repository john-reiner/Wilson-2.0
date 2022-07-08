import React, {useState, useEffect} from 'react'
import { 
        ActionIcon, 
        Menu, 
        Grid, 
        Title, 
        Divider, 
        Center,
        Anchor,
        Box,
        Group,
} from '@mantine/core';

import { Settings, Edit, Trash, BrandGithub } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

import ProjectTab from '../../Containers/MainContainer/Tab';
import ProjectInfo from '../Project/Components/Info/ProjectInfo';
import Features from '../../Features/Features';
import NotesContainer from '../../Notes/Containers/NotesContainer';
import DeleteProjectModal from './DeleteProjectModal';
import Feature from './Feature/Feature';
import ListsContainer from '../../Lists/Containers/ListsContainer';
import EditProjectModal from './EditProjectModal';
import MainContainerHeader from '../../Containers/MainContainer/MainContainerHeader';

export default function ProjectShow(props) {

    const [projectContent, setProjectContent] = useState("Info");
    const [project, setProject] = useState({});
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
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
    const changeProjectContent = contentName => setProjectContent(contentName)
    // const handleFeatureClick = id => {
    //     setFeatureId(id)
    //     setProjectContent("Feature")
    // }

    const handleTabClick = (tabName) => {
        setProjectContent(tabName)
    }

    let projectComponents = [
        [<ProjectInfo 
            setFetchAgainFlag={setFetchAgainFlag} 
            userId={props.user_id} 
            projectId={project.id} 
            editType="info" 
            editModalOpen={editModalOpen} 
            setEditModalOpen={setEditModalOpen} 
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
            // handleFeatureClick={handleFeatureClick}
            setFeatureId={setFeatureId}

        />, "Features"],      
        [<NotesContainer
            setFetchAgainFlag={setFetchAgainFlag} 
            userId={props.userId} 
            id={props.id}
            notable="projects"
            // notes={project.notes}
        />, "Notes"],
        [<Feature
            projectId={project.id}
            userId={props.userId}
            featureId={featureId}
            setFeatureTitle={setFeatureTitle}
        />, "Feature"]
    ]

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    return (
        <div>
            <EditProjectModal 
                setFetchAgainFlag={setFetchAgainFlag} 
                userId={props.userId} 
                projectId={props.projectId} 
                type={props.editType} 
                title={props.title} 
                github_url={props.github_url} 
                public={props.public} 
                description={props.description} 
                setEditModalOpen={props.setEditModalOpen} 
                editModalOpen={props.editModalOpen} 

            />
            <DeleteProjectModal 
                opened={deleteConfirmationModalOpen} 
                setDeleteConfirmationModalOpen={setDeleteConfirmationModalOpen}
                id={project.id}
                setViewToShow={props.setViewToShow}
                userId={props.userId}
            />
            <MainContainerHeader 
                title={project.title}
                handleTabClick={handleTabClick}
                setEditModalOpen={setEditModalOpen}
                setDeleteConfirmationModalOpen={setDeleteConfirmationModalOpen}
                tabs={projectShowTabs}
            />
            <Divider my="xs" />
            {renderContent(projectComponents, projectContent)}
        </div>
    )
}