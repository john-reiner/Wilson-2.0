import React from 'react'
import {Button, Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";


export default function NavBar(props) {
    
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
            <LinkContainer to={props.loggedinUser ? "/" : "/login"}>
                <Nav.Link><Button variant="outline-secondary">{props.loggedinUser ? props.loggedinUser : 'Please Login'}</Button></Nav.Link>
            </LinkContainer>
                
        </Navbar>
    )
}