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

import ProjectTab from './ProjectTab';
import ProjectInfo from '../Project/Components/Info/ProjectInfo';
import Features from '../../Features/Features';
import ProjectNotes from '../../Notes/ProjectNotes';
import DeleteProjectModal from './DeleteProjectModal';
import Feature from './Feature/Feature';
import ProjectLists from '../../Lists/ProjectLists';
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
    const handleFeatureClick = id => {
        setFeatureId(id)
        setProjectContent("Feature")
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
        [<ProjectLists
            title={project.title}
            projectId={props.id}
            userId={props.userId} 

        />, "Lists"],
        [<Features 
            setFetchAgainFlag={setFetchAgainFlag} 
            projectId={props.id} 
            userId={props.userId} 
            features={project.features} 
            handleFeatureClick={handleFeatureClick}
            setFeatureId={setFeatureId}

        />, "Features"],      
        [<ProjectNotes 
            setFetchAgainFlag={setFetchAgainFlag} 
            userId={props.userId} 
            projectId={props.id} 
            notes={project.notes} 
        />, "Notes"],
        [<Feature
            projectId={project.id}
            userId={props.userId}
            featureId={featureId}
            setFeatureTitle={setFeatureTitle}
        />, "Feature"]
    ]

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <ProjectTab 
                        name={tab} 
                        // handleTabClick={handleTabClick}
                        changeProjectContent={changeProjectContent}
                        projectContent={projectContent}
                        // index={projectComponents.indexOf(tab)}
                        key={keyNum}
                    />
        })
    }



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
                project={project}
                setEditModalOpen={setEditModalOpen}
                setDeleteConfirmationModalOpen={setDeleteConfirmationModalOpen}
                renderTabs={renderTabs}
                projectShowTabs={projectShowTabs}
            />
            <Divider my="xs" />
            {renderContent(projectComponents, projectContent)}
        </div>
    )
}