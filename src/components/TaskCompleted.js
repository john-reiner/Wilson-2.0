import React, { useState, useEffect }  from 'react'
import {ListGroup} from 'react-bootstrap'


export default function TaskCompleted(props) {
    return (
        <ListGroup.Item style={{textDecoration: 'line-through', borderRadius: '5px', color: "black", backgroundColor: props.rgb, margin: '10px'}} >
            <div style={{userSelect: "none", color: "black", backgroundColor: 'whitesmoke', padding: '4px', borderRadius: '5px', textAlign: 'center'}}>
                {props.name}
            </div>
        </ListGroup.Item>
    )
}
