import React, {useState} from 'react'

import ProjectsContainer from '../../Components/Projects/Containers/ProjectsContainer';
import Project from '../../Components/Projects/Components/Project/Project'
import NewProject from '../../Components/Projects/Containers/NewProject'

export default function MainContainer(props) {

    const [projectShowId, setProjectShowId] = useState(null);

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const handleProjectShow = id => {
        setProjectShowId(id)
        props.setViewToShow(1)
    }

    const views = [
        <ProjectsContainer 
            setViewToShow={props.setViewToShow}
            handleProjectShow={handleProjectShow} 
            userId={props.userId}
            viewTitle="Projects" 
            projects={props.user.projects}
            projectsTotal={props.user.projectsTotal}
        />,
        <Project 
            id={projectShowId} 
            userId={props.userId}  
            viewTitle="Project"
            setViewToShow={props.setViewToShow}
        />,
        <NewProject 
            handleProjectShow={handleProjectShow} 
            viewTitle="New Project" 
            setViewToShow={props.setViewToShow} 
            userId={props.userId} 
        />
    ]

    return (
        <div>
            {renderView(props.viewToShow, views)}
        </div>
    )
}
