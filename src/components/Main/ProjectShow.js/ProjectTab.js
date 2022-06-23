import React from 'react'

export default function ProjectTab(props) {

    return (
        <div onClick={() => props.handleTabClick(props.index)} className={props.index === props.projectTabIndex ? "project-nav-item-active": "project-nav-item"}>{props.name}</div>
    )
}
