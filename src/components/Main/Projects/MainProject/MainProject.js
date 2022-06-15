import React from 'react'
import './MainProject.css'

export default function Project(props) {

    return (
        <div className="projects-project-container">
            <div className="projects-project-body">
                <div className='project-title'><h4>{props.title}</h4></div>
                <div className="show-button" onClick={() => props.handleProjectShow(props.id)}>Show</div>
            </div>
        </div>
    )
}
