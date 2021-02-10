import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function DeleteModal(props) {

    const handleDelete = () => {
        fetch(`http://localhost:3001/tasks/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
        })
        .then(response => response.json())
        .then(task => {
            props.getRemovedTaskId(task.id)
            props.handleDeleteModalClose()
        })
    }


    return (
        <Modal show={props.show} onHide={props.handleDeleteModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete "{props.name}" Task?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={props.handleDeleteModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
