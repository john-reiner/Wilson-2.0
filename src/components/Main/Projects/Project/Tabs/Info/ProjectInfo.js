import React from 'react'
import './ProjectInfo.css'

export default function Info(props) {
    return (
        <div id='project-info-container'>
            <div className='info-section-container'>
                <div className="container-heading">
                    <h4>Description</h4>
                </div>
                <div className="info-content-container">
                    <p>{props.description}</p>
                </div>
            </div>
            <p><a href={props.github_url}>GitHub</a></p>
            {props.public && <p>Public</p>}
        </div>
    )
}
