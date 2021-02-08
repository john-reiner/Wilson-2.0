
import React, { useState, useEffect }  from 'react'
import {ListGroup, Form} from 'react-bootstrap'

export default function Task(props) {

    const [clicked, setClicked] = useState(props.completed)

    const handleCheckClick = id => {
        props.completeTask(id)
        setClicked(!clicked)
        if (clicked === true) {
            props.handleProgressBarChange(-1)
        } else {
            props.handleProgressBarChange(1)
        }
    }

    return (
        <ListGroup.Item className='task' style={{textDecoration: clicked ? 'line-through' : '', backgroundColor: props.rgb }} >
            <div className='task-body'>
                <Form.Check 
                    custom
                    onClick={() => handleCheckClick(props.id)}
                    defaultChecked={props.completed}
                    id={props.id}
                    className="check"
                />
                {props.name}
            </div>
        </ListGroup.Item>
    )
}

// textDecoration: props.completeTaskids.includes(props.id) ? 'line-through' : ''