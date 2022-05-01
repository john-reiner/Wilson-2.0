import React from 'react';
import './Navbar.css'

const NavBar = (props) => {

    // const renderLogin = () => {
    //     if (props.loggedIn) {
    //         return (
    //             <Stack direction="horizontal" gap={4}>
    //                 <Nav.Link onClick={props.logout}>Logout</Nav.Link>
    //                 <Button variant="secondary" onClick={null}>{props.firstName}</Button>
    //             </Stack>
    //         )
    //     } else {
    //         return (
    //             <Stack direction="horizontal" gap={4}>
    //                 <Nav.Link onClick={() => props.setAppComponent('login')}>Login</Nav.Link>
    //                 <Button variant="secondary" onClick={() => props.setAppComponent('signup')}>Get Started</Button>
    //             </Stack>
    //         )
    //     }
    // }

    return (
        <div id="navbar-container">
            <ul id="left-side-items">
                <li id="navbar-logo">Wilson</li>             
            </ul>
            <ul id="right-side-items">
                <li>Login</li>
                <li>Sign Up</li>
            </ul>
        </div>
    );
};
export default NavBar;
        // <Navbar id="nav-bar" variant="dark" expand="sm" sticky="top">
        //     <Container fluid>
        //     <Navbar.Brand onClick={() => props.setAppComponent("landing")} className="text-secondary" id="wilson-text">
        //         Wilson
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //     <Nav id="nav-nav-bar" className="me-auto">
        //         <Nav.Link href="/">Home</Nav.Link>
        //     </Nav>
        //     <Nav>
        //         {renderLogin()}
        //     </Nav>
        //     </Navbar.Collapse>

        //     </Container>
        // </Navbar>