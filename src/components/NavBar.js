import React from 'react'
import {NavDropdown, Button, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";


export default function NavBar(props) {

    const renderDropdown = () => {
        if (props.loggedinUser) {
            return (
                <Nav className="justify-content-end">
                    <NavDropdown id="signed-in-dropdown" title={props.loggedinUser} >
                        <LinkContainer to={"/"}>
                            <NavDropdown.Item>Home</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to={"/completed"}>
                            <NavDropdown.Item >Completed Goals</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={props.logoutUser}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="secondary" onClick={props.handleGoalModalShow}>
                        New Goal
                    </Button>
                </Nav>
            )
        } else {
            return (
                <LinkContainer to='/login'><Button variant="secondary">Please Login</Button></LinkContainer>
            )
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md">
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {props.loggedinUser && <LinkContainer to="/completed"><Nav.Link >Completed</Nav.Link></LinkContainer>}
                    </Nav>
                    <Nav>
                        {renderDropdown()}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}