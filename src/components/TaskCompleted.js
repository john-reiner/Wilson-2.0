import React, { useState, useEffect }  from 'react'
import {ListGroup} from 'react-bootstrap'


export default function TaskCompleted(props) {
    return (
        <ListGroup.Item className='task' style={{  backgroundColor: props.rgb }} >
            <div className="task-body-complete">
                {props.name}
            </div>
        </ListGroup.Item>
    )
}
