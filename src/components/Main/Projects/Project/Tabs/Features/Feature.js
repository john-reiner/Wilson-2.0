import React from 'react'
import './Feature.css'

export default function Feature(props) {
    return (
        <div className="feature-container">
            <div className="feature-title-container">
                <h4 >{props.title}</h4>
                <p>Due: {props.dueDate}</p>
            </div>
            <div className="feature-content-container">
                <p>Description: {props.description}</p>
                <p>Public? {props.public}</p>
            </div>
        </div>
    )
}
