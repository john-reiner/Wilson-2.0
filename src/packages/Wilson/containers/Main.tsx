import React, {useState} from 'react'

import Projects from '../packages/Projects/Projects';
import Project from '../packages/Project/Project'
import NewProject from '../packages/Projects/components/NewProject'
import { ROUTE } from '../../../routes';

interface MainProps {
    user: {},
    setViewToShow: React.Dispatch<React.SetStateAction<number>>,
    viewToShow: number
}

export default function Main({
    user,
    setViewToShow,
    viewToShow
}: MainProps) {

    const [projectShowId, setProjectShowId] = useState(0);

    const projectsRoute = `${ROUTE}/projects`
    const projectRoute = `${projectsRoute}/${projectShowId}`
    
    const renderView = (
        viewToShow: number, viewsArray: JSX.Element[]
        ) => viewsArray[viewToShow]

    const handleProjectShow = (
        id: number
        ) => {
        setProjectShowId(id)
        setViewToShow(1)
    }

    const viewsList = [
        <Projects 
            setViewToShow={setViewToShow}
            handleProjectShow={handleProjectShow} 
            route={projectsRoute}
        />,
        <Project
            id={projectShowId}
            route={projectRoute}
            setViewToShow={setViewToShow}
        />,
        <NewProject 
            handleProjectShow={handleProjectShow}
            // viewTitle="New Project" 
            setViewToShow={setViewToShow} 
        />
    ]

    return (
        <div>
            {renderView(viewToShow, viewsList)}
        </div>
    )
}
