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
import ProjectInfo from './ProjectComponents/Info/ProjectInfo';
import ProjectFeatures from './ProjectComponents/Features/ProjectFeatures';
import ProjectNotes from './ProjectComponents/Notes/ProjectNotes';
import DeleteProjectModal from './DeleteProjectModal';
import Feature from './FeatureShow/Feature';
import ProjectLists from './ProjectComponents/Lists/ProjectLists';

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
        [<ProjectFeatures 
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
            <DeleteProjectModal 
                opened={deleteConfirmationModalOpen} 
                setDeleteConfirmationModalOpen={setDeleteConfirmationModalOpen}
                id={project.id}
                setViewToShow={props.setViewToShow}
                userId={props.userId}
            />
            <Grid align="center">
                <Grid.Col span={11}>
                    <Title 
                        order={2}
                        className="wilson-logo-small"
                    >
                        {featureTitle ? project.title+ " -> " + featureTitle : project.title}
                    </Title>
                </Grid.Col>

                <Grid.Col 
                    span={1}
                    align="right"
                >
                    <Menu
                        opened={opened} 
                        onOpen={handlers.open} 
                        onClose={handlers.close}
                        control={<ActionIcon variant="hover" color="blue"><Settings size={16} /></ActionIcon>}
                    >
                        <Menu.Item
                            icon={<Edit size={14} />}
                            onClick={() => setEditModalOpen(true)}
                        >
                            Edit
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                            color="red" 
                            icon={<Trash size={14} />}
                            onClick={() => setDeleteConfirmationModalOpen(true)}
                        >
                            Delete Project
                        </Menu.Item>
                    </Menu>
                </Grid.Col>
                <Grid.Col 
                    span={9}
                >
                    <Group spacing="xs">
                        {renderTabs(projectShowTabs)}
                    </Group>
                </Grid.Col>
                <Grid.Col 
                    span={3}
                    align="right"
                >
                    <Anchor href={project.github_url} target="_blank">
                        <Center inline>
                            <ActionIcon 
                                variant="hover" 
                                >
                                <BrandGithub size={16} />
                            </ActionIcon>
                            <Box ml={5}>{project.public ? "Public" : "Private"}</Box>
                        </Center>
                    </Anchor>
                </Grid.Col>
            </Grid>
            <hr></hr>
                {renderContent(projectComponents, projectContent)}
        </div>
    )
}