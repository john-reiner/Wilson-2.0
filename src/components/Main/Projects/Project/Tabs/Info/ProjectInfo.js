import React from 'react'
import './ProjectInfo.css'

export default function Info(props) {
    return (
        <div id='project-info-container'>
            <div id="edit-project-info">Edit</div>
            <p>{props.description}</p>
            <p><a href={props.github_url}>GitHub</a></p>
            {props.public && <p>Public</p>}
        </div>
    )
}
