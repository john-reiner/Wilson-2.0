import React, {useState, useEffect} from 'react'
import './Main.css'
import Projects from './Projects/Projects';
import ProjectShow from './Projects/ProjectShow'
import HomeView from './Home/HomeView';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Col, Row, Nav, NavDropdown } from 'react-bootstrap'


export default function Main(props) {

    const [navOpen, setNavOpen] = useState(true);
    const [navOpenCloseEvent, setNavOpenCloseEvent] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);

    const views = [
        <HomeView user={props.user} viewTitle="Home" />,
        <Projects setViewToShow={setViewToShow} userId={props.user.id} viewTitle="Projects" />,
        <ProjectShow viewTitle="Project" />
    ]

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
                document.getElementById("main-content").style.width = "calc(100% - 200px)"
                setNavOpen(true)
                setNavOpenCloseEvent(false)            
            }
        }
    }, [navOpen, navOpenCloseEvent]);

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const renderTitle = () => {
        let view = renderView(viewToShow, views)
        return view.props.viewTitle
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
                <div id="main-content-heading">
                    {!navOpen && <div onClick={() => setNavOpenCloseEvent(true)} id="open-nav-button">></div>}
                    <h2>{renderTitle()}</h2>
                </div>

                {renderView(viewToShow, views)}
            </div>
        </div>
    )
}