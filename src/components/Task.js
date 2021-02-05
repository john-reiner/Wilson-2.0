
import React, { useState, useEffect }  from 'react'
import {ListGroup, Form} from 'react-bootstrap'

export default function Task(props) {

    const [clicked, setClicked] = useState(props.completed)

    //check props.completed for a t/f value 
    const handleCheckClick = id => {
        props.completeTask(id)
        setClicked(!clicked)
    }

    return (
        <ListGroup.Item style={{textDecoration: clicked ? 'line-through' : '', borderRadius: '5px', color: "black", backgroundColor: props.rgb, margin: '10px'}} >
            <div style={{userSelect: "none", color: "black", backgroundColor: 'whitesmoke', padding: '4px', borderRadius: '5px', textAlign: 'center'}}>
            <Form.Check 
                custom
                onClick={() => handleCheckClick(props.id)}
                defaultChecked={props.completed}
                id={props.id}
            />
                {props.name}
            </div>
        </ListGroup.Item>
    )
}

// textDecoration: props.completeTaskids.includes(props.id) ? 'line-through' : ''