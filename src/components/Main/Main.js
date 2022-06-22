import React, {useState, useEffect} from 'react'
// import './Main.css'
// import Projects from './Projects/Projects';
// import Project from './Projects/Project/Project'
// import NewProject from './Projects/New/NewProject'


export default function Main() {

    // const [navOpen, setNavOpen] = useState(true);
    // const [navOpenCloseEvent, setNavOpenCloseEvent] = useState(false);
    // const [viewToShow, setViewToShow] = useState(0);
    // const [projectShowId, setProjectShowId] = useState(null);
    // const [projectTitle, setProjectTitle] = useState(null);



    // const handleProjectShow = id => {
    //     setProjectShowId(id)
    //     setViewToShow(1)
    // }

    // useEffect(() => {
    //     if (navOpenCloseEvent) {
    //         if (navOpen) {
    //             document.getElementById("left-bar-container").style.width = "0"
    //             document.getElementById("main-content").style.marginLeft = "0"
    //             document.getElementById("main-content").style.width = "100%"
    //             setNavOpen(false)
    //             setNavOpenCloseEvent(false)
    //         } else {
    //             document.getElementById("left-bar-container").style.width = "200px"
    //             document.getElementById("main-content").style.marginLeft = "200px"
    //             document.getElementById("main-content").style.width = "calc(100% - 200px)"
    //             setNavOpen(true)
    //             setNavOpenCloseEvent(false)            
    //         }
    //     }
    // }, [navOpen, navOpenCloseEvent]);

    // const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    // const views = [
    //     <Projects 
    //         setViewToShow={setViewToShow}
    //         handleProjectShow={handleProjectShow} 
    //         userId={props.userId}
    //         viewTitle="Projects" 
    //         />,
    //     <Project setProjectTitle={setProjectTitle} id={projectShowId} userId={props.userId}  viewTitle="Project" />,
    //     <NewProject handleProjectShow={handleProjectShow} viewTitle="New Project" setViewToShow={setViewToShow} userId={props.userId} />
    // ]

    return (
        <div id="main-container">
        </div>
    )
}
            // <div id="left-bar-container">
            //     <div id="header-container">
            //         <div onClick={() => setNavOpenCloseEvent(true)} id="close-nav-button-container">
            //             <span id="close-nav-button">X</span>
            //         </div>
            //         <div id="logo-nav-container">
            //             <span className="wilson-logo-w">W</span>
            //         </div>
            //     </div>

            //     <div id="lists-container">
            //         <div id="left-nav-list">
            //             <div onClick={() => setViewToShow(0)} className="left-nav-item">Projects</div>
            //         </div>
            //         <div id="bottom-nav-list">
            //             <div className="bottom-nav-item">
            //                 {props.userInfo.first_name}
            //                 <div className="bottom-nav-sublist">
            //                     <div className="bottom-nav-subitem" onClick={props.logout}>Logout</div>
            //                     <div className="bottom-nav-subitem">Settings</div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>


            // </div>
            // <div id="main-content">
            //     <div>
            //         {!navOpen && <div onClick={() => setNavOpenCloseEvent(true)} id="open-nav-button">`{'>'}`</div>}
            //     </div>

            //     {renderView(viewToShow, views)}
            // </div>