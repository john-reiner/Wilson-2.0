import React, {useState, useEffect} from 'react'
import './Project.css'
import ProjectTab from './ProjectTab';
import ProjectInfo from './Tabs/Info/ProjectInfo';
import ProjectFeatures from './Tabs/Features/ProjectFeatures';
import ProjectNotes from './Tabs/Notes/ProjectNotes';

import { FaGithub } from 'react-icons/fa'


export default function ProjectShow(props) {

    const [projectTabIndex, setProjectTabIndex] = useState(0);
    const [project, setProject] = useState({});
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);

    const fetchProject = () => {
        fetch(`http://localhost:3001/api/v2/users/${props.user_id}/projects/${props.id}`)
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

    let tabComponents = [
        <ProjectInfo github_url={project.github_url} public={project.public} description={project.description} tabName="Info" />,
        <ProjectFeatures setFetchAgainFlag={setFetchAgainFlag} projectId={props.id} userId={props.userId} features={project.features} tabName="Features"/>,      
        <ProjectNotes setFetchAgainFlag={setFetchAgainFlag} userId={props.userId} projectId={props.id} notes={project.notes} tabName="Notes" />,
    ]

    const renderTabs = (tabsArray) => {
        let keyNum = -1
        return tabsArray.map(tab => {
            keyNum ++
            return <ProjectTab 
                    name={tab.props.tabName} 
                    handleTabClick={handleTabClick}
                    projectTabIndex={projectTabIndex}
                    index={tabComponents.indexOf(tab)}
                    key={keyNum}
                    />
        })
    }

    const renderContent = (tabsArray, index) => tabsArray[index]
    const handleTabClick = (index) => setProjectTabIndex(index)

    return (
        <div id='project-show-container'>
            <div id='project-show-header'>
                <div className="header-row">
                    <h2>{project.title}</h2>
                    <div id="edit-project-button">Edit</div>
                </div>
                <div className="header-row icons">
                    <div id="project-show-nav">
                        {renderTabs(tabComponents)}
                    </div>
                    <a href={project.github}><FaGithub className="project-header-icon"/></a>
                </div>

            </div>
            <></>
            {renderContent(tabComponents, projectTabIndex)}
        </div>
    )
}