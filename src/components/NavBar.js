import React from 'react'
import {NavDropdown, Button, Dropdown, Nav, Navbar} from 'react-bootstrap'



export default function NavBar(props) {

    const renderDropdown = () => {
        if (props.loggedinUser) {
            return (
                <Nav className="justify-content-end">
                    <NavDropdown id="signed-in-dropdown" title={props.loggedinUser} >

                            <NavDropdown.Item>Home</NavDropdown.Item>


                            <NavDropdown.Item >Completed Goals</NavDropdown.Item>

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
                <Button variant="secondary">Please Login</Button>
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
                        {props.loggedinUser && <Nav.Link >Completed</Nav.Link>}
                    </Nav>
                    <Nav>
                        {renderDropdown()}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}