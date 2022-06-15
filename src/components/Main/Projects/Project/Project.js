import React, {useState, useEffect} from 'react'
// import useFetch from '../../../../hooks/useFetch';
import './Project.css'
import ProjectTab from './ProjectTab';
import ProjectInfo from './Tabs/ProjectInfo';
import ProjectFeatures from './Tabs/ProjectFeatures';
import ProjectNotes from './Tabs/ProjectNotes';


export default function ProjectShow(props) {

    const [projectTabIndex, setProjectTabIndex] = useState(0);
    const [project, setProject] = useState({});

    const fetchProject = () => {
        console.log("fetching project")
        fetch(`http://localhost:3001/api/v2/users/${props.user_id}/projects/${props.id}`)
        .then(response => response.json())
        .then(payload => {
            setProject(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    // const [{requestedData: project, errors, loading}, goFetch] = useFetch("")

    // useEffect(() => {
    //     if (props.id && props.userId) {
    //         console.log(props.id, props.userId)
    //         goFetch(`http://localhost:3001/api/v2/users/1/projects/1`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
    //             }
    //         })
    //     }
    // }, [props.id, props.userId]);

    useEffect(() => {
        fetchProject()
    }, []);

    let tabComponents = [
        <ProjectInfo github_url={project.github_url} public={project.public} description={project.description} tabName="Info" />,
        <ProjectFeatures features={project.features} tabName="Features"/>,      
        <ProjectNotes tabName="Notes" />,
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

    console.log(project)

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