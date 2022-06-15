import React, {useState, useEffect} from 'react'
import './Main.css'
import Projects from './Projects/Projects';
import Project from './Projects/Project/Project'
import NewProject from './Projects/New/NewProject'


export default function Main(props) {

    const [navOpen, setNavOpen] = useState(true);
    const [navOpenCloseEvent, setNavOpenCloseEvent] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);
    const [projectShowId, setProjectShowId] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);



    const handleProjectShow = id => {
        setProjectShowId(id)
        setViewToShow(1)
    }

    // useEffect(() => {
    //     if (projectTitle) {
    //         console.log(projectTitle)
    //         setProjectTitle(null)
    //     }
    // }, []);

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

    // const renderTitle = () => {
    //     let view = renderView(viewToShow, views)
    //     return view.props.viewTitle
    // }

    const views = [
        <Projects 
            setViewToShow={setViewToShow}
            handleProjectShow={handleProjectShow} 
            userId={props.user.id} 
            viewTitle="Projects" 
            />,
        <Project setProjectTitle={setProjectTitle} id={projectShowId} userId={props.user.id} viewTitle="Project" />,
        <NewProject handleProjectShow={handleProjectShow} viewTitle="New Project" setViewToShow={setViewToShow} userId={props.user.id}/>
    ]

    return (
        <div id="main-container">
            <div id="left-bar-container">
                <div onClick={() => setNavOpenCloseEvent(true)} id="close-nav-button">X</div>
                <ul id="left-nav-list">
                    <li onClick={() => setViewToShow(0)} className="left-nav-item">Projects</li>
                </ul>
            </div>
            <div id="main-content">
                <div>
                    {!navOpen && <div onClick={() => setNavOpenCloseEvent(true)} id="open-nav-button">></div>}
                    {/* <h2>{projectTitle ? projectTitle : renderTitle()}</h2> */}
                </div>

                {renderView(viewToShow, views)}
            </div>
        </div>
    )
}