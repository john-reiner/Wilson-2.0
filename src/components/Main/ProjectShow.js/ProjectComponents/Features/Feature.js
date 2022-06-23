import React from 'react'
import { Accordion } from '@mantine/core';

export default function Feature(props) {
    return (
        <Accordion.Item label={props.title}>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Item>
        // <div className="feature-container">
        //     <div className="feature-title-container">
        //         <h4 >{props.title}</h4>
        //         <p>Due: {props.dueDate}</p>
        //     </div>
        //     <div className="feature-content-container">
        //         <p>Description: {props.description}</p>
        //         <p>Public? {props.public}</p>
        //     </div>
        // </div>
    )
}
