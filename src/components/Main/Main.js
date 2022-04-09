import React, {useState, useEffect} from 'react'
import './Main.css'
import Projects from './Projects/Projects';
import HomeView from './Home/HomeView';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Col, Row, Nav, NavDropdown } from 'react-bootstrap'


export default function Main(props) {

    const [navOpen, setNavOpen] = useState(true);
    const [navOpenCloseEvent, setNavOpenCloseEvent] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);

    useEffect(() => {
        if (navOpenCloseEvent) {
            if (navOpen) {
                document.getElementById("left-bar-container").style.width = "0"
                document.getElementById("main-content").style.marginLeft = "0"
                document.getElementById("main-content").style.width = "100%"
                setNavOpen(false)
                setNavOpenCloseEvent(false)
            } else {
                document.getElementById("left-bar-container").style.width = "200px"
                document.getElementById("main-content").style.marginLeft = "200px"
                setNavOpen(true)
                setNavOpenCloseEvent(false)            
            }
        }
    }, [navOpen, navOpenCloseEvent]);

    const renderView = viewToShow => {
        const views = [
            <HomeView user={props.user} />,
            <Projects userId={props.user.id}/>
        ]
        return views[viewToShow]
    }

    return (
        <div id="main-container">
            <div id="left-bar-container">
                <div onClick={() => setNavOpenCloseEvent(true)} id="close-nav-button">X</div>
                <ul id="left-nav-list">
                    <li onClick={() => setViewToShow(0)} className="left-nav-item">Home</li>
                    <li onClick={() => setViewToShow(1)} className="left-nav-item">Projects</li>
                </ul>
            </div>
            <div id="main-content">
                {!navOpen && <div onClick={() => setNavOpenCloseEvent(true)} id="open-nav-button">></div>}
                {renderView(viewToShow)}
            </div>
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