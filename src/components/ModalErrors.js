import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function LoginErrors(props) {



    return (
        <Modal show={props.show} onHide={props.handleErrorClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errors}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleErrorClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
