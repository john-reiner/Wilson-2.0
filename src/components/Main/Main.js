import React, {useState, useEffect} from 'react'
import './Main.css'
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Col, Row, Nav } from 'react-bootstrap'


export default function Main(props) {

    console.log(props.user)

    return (
        <div id="main-container">
            <div id="left-bar-container"><div id="close-nav-button">X</div></div>
            <div id="main-content">main</div>
        </div>
    )
}
        // <Container fluid>
        //     <Row>
        //         <Col id="left-navbar-container" menuVariant="dark">            
        //             <ArrowLeft className="ml-auto" />
        //             <Nav variant="dark" bg="dark" defaultActiveKey="/home" className="flex-column" closeButton>
        //                 <Nav.Link href="/home">Active</Nav.Link>
        //                 <Nav.Link eventKey="link-1">Link</Nav.Link>
        //                 <Nav.Link eventKey="link-2">Link</Nav.Link>
        //                 <Nav.Link eventKey="disabled" disabled>
        //                     Disabled
        //                 </Nav.Link>
        //             </Nav>
        //         </Col>
        //         <Col xs={10} id="main-container">{props.user.first_name}</Col>
        //     </Row>
        // </Container>