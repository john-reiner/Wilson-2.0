import React from 'react'

export default function Feature(props) {
    return (
        <div>
            <h4>{props.title}</h4>
            <p>Description: {props.description}</p>
            <p>Due Date: {props.dueDate}</p>
            <p>Public? {props.public}</p>
        </div>
    )
}
