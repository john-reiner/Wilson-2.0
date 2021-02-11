import React from 'react'
import {NavDropdown, Button, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";


export default function NavBar(props) {

    const renderDropdown = () => {
        if (props.loggedinUser) {
            return (
                <div id="navbar-right">
                    <Button variant="secondary" id="new-goal-button" onClick={props.handleGoalModalShow}>
                        New Goal
                    </Button>
                    <NavDropdown title={props.loggedinUser} id="basic-nav-dropdown" menuAlign="right">
                        <LinkContainer to={"/main"}>
                            <NavDropdown.Item>Home</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to={"/completed"}>
                            <NavDropdown.Item >Completed Goals</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={props.logoutUser}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>
            )
        } else {
            return (
                <LinkContainer to='/'><Button variant="secondary">Please Login</Button></LinkContainer>
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
                    {renderDropdown()}


                </Navbar.Collapse>
        </Navbar>
    )
}