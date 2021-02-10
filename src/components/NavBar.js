import React from 'react'
import {DropdownButton, Button, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";


export default function NavBar(props) {

    const renderDropdown = () => {
        if (props.loggedinUser) {
            return (
                <div id="navbar-right">
                    <Button variant="secondary" id="new-goal-button" onClick={props.handleGoalModalShow}>
                        New Goal
                    </Button>
                    <DropdownButton
                        menuAlign="right"
                        title={props.loggedinUser}
                    >
                        <LinkContainer to={"/"}>
                            <Dropdown.Item active='false' >Home</Dropdown.Item>
                        </LinkContainer>
                        <LinkContainer to={"/completed"}>
                            <Dropdown.Item href="/completed">Completed Goals</Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={props.logoutUser}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            )
        } else {
            return (
                <LinkContainer to='/login'><Button variant="secondary">Please Login</Button></LinkContainer>
            )
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img
                        alt=""
                        src="wilson.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Wilson
                    </Navbar.Brand>
            <Nav className="mr-auto">
                {props.loggedinUser && <LinkContainer to="/completed"><Nav.Link >Completed</Nav.Link></LinkContainer>}
            </Nav>
                {renderDropdown()}
        </Navbar>
    )
}