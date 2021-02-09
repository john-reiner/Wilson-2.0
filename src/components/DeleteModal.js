import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function DeleteModal(props) {



    return (
        <Modal show={props.show} onHide={props.handleDeleteModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error:</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete {props.name} Goal?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleDelete}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={props.handleDeleteModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}