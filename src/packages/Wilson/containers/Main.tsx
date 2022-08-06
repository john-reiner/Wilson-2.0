import React, {useState} from 'react'

import Projects from '../packages/Projects';
import Project from '../packages/Project'
import NewProject from '../packages/Projects/components/NewProject'

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
            viewTitle="Projects" 
        />,
        <Project
            id={projectShowId}
            viewTitle="Project"
            setViewToShow={setViewToShow}
        />,
        <NewProject 
            handleProjectShow={handleProjectShow}
            viewTitle="New Project" 
            setViewToShow={setViewToShow} 
        />
    ]

    return (
        <div>
            {renderView(viewToShow, viewsList)}
        </div>
    )
}
