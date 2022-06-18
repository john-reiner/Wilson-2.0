import React, {useState, useEffect} from 'react'
import './Project.css'
import ProjectTab from './ProjectTab';
import ProjectInfo from './Tabs/Info/ProjectInfo';
import ProjectFeatures from './Tabs/Features/ProjectFeatures';
import ProjectNotes from './Tabs/Notes/ProjectNotes';


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
            <h2 id="project-show-title">{project.title}</h2>
            <hr></hr>
            <ul id="project-show-nav">
                {renderTabs(tabComponents)}
            </ul>
            <hr></hr>
            {renderContent(tabComponents, projectTabIndex)}
        </div>
    )
}