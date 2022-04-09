import React from 'react'


export default function HomeView(props) {

    return (
        <div>
            <h4>Welcome {props.user.first_name}</h4>
            <p>You have {props.user.projects.length} projects</p>
        </div>
    )
}
