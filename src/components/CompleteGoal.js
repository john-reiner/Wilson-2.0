import React from 'react'
import {Modal, Button} from 'react-bootstrap'


export default function CompleteGoal(props) {

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>{`Congrats!! You Completed the SOMEGOAL`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Would you like to mark this goal as complete?</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => props.completeGoal(props.id)} block>
                Complete
            </Button>

            </Modal.Footer>
        </Modal>
    )
}