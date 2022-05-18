import React from 'react'

export default function Info(props) {
    return (
        <div>
            <p>{props.description}</p>
            <p><a href={props.github_url}>GitHub</a></p>
            {props.public && <p>Public</p>}
        </div>
    )
}
