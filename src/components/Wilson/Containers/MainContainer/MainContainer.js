import React, {useState} from 'react'

import Projects from '../../Projects/Projects';
import Project from '../../Projects/Project/Project'
import NewProject from '../../Projects/NewProject'

export default function MainContainer(props) {

    const [viewToShow, setViewToShow] = useState(0);
    const [projectShowId, setProjectShowId] = useState(null);

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const handleProjectShow = id => {
        setProjectShowId(id)
        setViewToShow(1)
    }

    const views = [
        <Projects 
            setViewToShow={setViewToShow}
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
            setViewToShow={setViewToShow}
        />,
        <NewProject 
            handleProjectShow={handleProjectShow} 
            viewTitle="New Project" 
            setViewToShow={setViewToShow} 
            userId={props.userId} 
        />
    ]

    return (
        <div>
            {renderView(viewToShow, views)}
        </div>
    )
}
