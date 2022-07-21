import React, {useState} from 'react'

import ProjectsContainer from '../../Components/Projects/Containers/ProjectsContainer';
import ProjectContainer from '../../Components/Projects/Containers/ProjectContainer'
import NewProject from '../../Components/Projects/Containers/NewProject'

export default function MainContainer(props) {

    const [projectShowId, setProjectShowId] = useState(0);

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
            projectsTotal={props.user.projectsTotal}
        />,
        <ProjectContainer
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
