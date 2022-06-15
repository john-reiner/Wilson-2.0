import React from 'react'

export default function Note(props) {
    return (
        <div>
            <h4>{props.title}</h4>
            <p>{props.content}</p>
        </div>
    )
}
