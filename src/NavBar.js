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
                    <Nav.Link onClick={() => props.setAppComponent('login')}>Login</Nav.Link>
                    <Button variant="secondary" onClick={() => props.setAppComponent('signup')}>Get Started</Button>
                </Stack>
            )
        }
    }

    return (
        <Navbar id="nav-bar" variant="dark" expand="sm" sticky="top">
            <Container fluid>
            <Navbar.Brand onClick={() => props.setAppComponent("landing")} className="text-secondary" id="wilson-text">
                Wilson
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav-nav-bar" className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
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