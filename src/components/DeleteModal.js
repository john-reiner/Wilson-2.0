import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function DeleteModal(props) {

    const handleDelete = () => {
        fetch(`https://wilson-rails.herokuapp.com/goals/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
        })
        .then(response => response.json())
        .then(goal => {
            props.getCompletedGoalId(goal.id)
            props.handleDeleteModalClose()
        })
    }


    return (
        <Modal show={props.show} onHide={props.handleDeleteModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete "{props.name}" Goal?</Modal.Body>
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