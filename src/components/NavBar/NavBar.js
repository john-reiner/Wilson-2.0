import React from 'react';
import './Navbar.css'

const NavBar = (props) => {

    const renderLogin = () => {
        if (!props.loggedIn) {
            return (
                <div>
                    <li className="item button" onClick={() => props.setAppComponent("signup")}>Sign Up</li>
                    <li className="item button" onClick={() => props.setAppComponent("login")}>Login</li>
                </div>
            )
        } else {
            return (
                <div>
                    <li className="item button" onClick={props.logout}>Logout</li>
                </div>
            )
        }
    }



    return (
        <nav>
            <ul className='navbar-menu'>
                <li className="logo" onClick={() => props.setAppComponent("landing")}>Wilson</li>
                <li className="item">About</li>
                {renderLogin()}
                <li className="toggle"><span className="bars"></span></li>
            </ul>
        </nav>
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