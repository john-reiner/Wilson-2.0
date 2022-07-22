import React, {useState} from 'react'

import Projects from '../packages/Projects';
import Project from '../packages/Project'
import NewProject from '../packages/Projects/components/NewProject'

export default function Main(props) {

    const [projectShowId, setProjectShowId] = useState(0);

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const handleProjectShow = id => {
        setProjectShowId(id)
        props.setViewToShow(1)
    }

    const viewsList = [
        <Projects 
            setViewToShow={props.setViewToShow}
            handleProjectShow={handleProjectShow} 
            userId={props.userId}
            viewTitle="Projects" 
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
            {renderView(props.viewToShow, viewsList)}
        </div>
    )
}
