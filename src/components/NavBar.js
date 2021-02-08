import React from 'react'
import {DropdownButton, Button, Dropdown, Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";


export default function NavBar(props) {

    const renderDropdown = () => {
        if (props.loggedinUser) {
            return (
                <DropdownButton
                    menuAlign="right"
                    title={props.loggedinUser}
                    id="dropdown-menu-align-right"
                >
                    <LinkContainer to={"/"}>
                        <Dropdown.Item>Home</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={"/completed"}>
                        <Dropdown.Item href="/completed">Completed Goals</Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" onClick={() => props.logoutUser(1)}>Logout</Dropdown.Item>
                </DropdownButton>
            )
        } else {
            return (
                <Button variant="secondary">Please Login</Button>
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

                <LinkContainer to="/completed">
                    <Nav.Link>Completed</Nav.Link>
                </LinkContainer>
            </Nav>
                {renderDropdown()}
        </Navbar>
    )
}