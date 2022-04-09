import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Stack} from 'react-bootstrap';

const NavBar = (props) => {

    const renderLogin = () => {
        if (props.loggedIn) {
            return (
                <Stack direction="horizontal" gap={4}>
                    <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                    <Button variant="secondary" onClick={null}>{props.firstName}</Button>
                </Stack>
            )
        } else {
            return (
                <Stack direction="horizontal" gap={4}>
                    <Nav.Link onClick={() => props.setComponentIndex(2)}>Login</Nav.Link>
                    <Button variant="secondary" onClick={() => props.setComponentIndex(1)}>Get Started</Button>
                </Stack>
            )
        }
    }

    return (
        <Navbar id="nav-bar" variant="dark" expand="sm" sticky="top">
            <Container fluid>
            <Navbar.Brand onClick={() => props.setComponentIndex(0)} className="text-secondary" id="wilson-text">
                Wilson
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav-nav-bar" className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                {renderLogin()}
            </Nav>
            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};
export default NavBar;