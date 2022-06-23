import React, {useState, useEffect} from 'react'
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    ActionIcon,
    Group
} from '@mantine/core';

import { Sun, MoonStars } from 'tabler-icons-react';

import LeftNavbar from './LeftNavbar';
import Projects from './Projects/Projects';
import Project from './Projects/Project/Project'
import NewProject from './Projects/New/NewProject'


export default function Main(props) {

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    // const [navOpen, setNavOpen] = useState(true);
    // const [navOpenCloseEvent, setNavOpenCloseEvent] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);
    const [projectShowId, setProjectShowId] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);



    const handleProjectShow = id => {
        setProjectShowId(id)
        setViewToShow(1)
    }

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

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const views = [
        <Projects 
            setViewToShow={setViewToShow}
            handleProjectShow={handleProjectShow} 
            userId={props.userId}
            viewTitle="Projects" 
            />,
        <Project setProjectTitle={setProjectTitle} id={projectShowId} userId={props.userId}  viewTitle="Project" />,
        <NewProject handleProjectShow={handleProjectShow} viewTitle="New Project" setViewToShow={setViewToShow} userId={props.userId} />
    ]

    return (
        <AppShell
            styles={{
            main: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>

                <LeftNavbar setViewToShow={setViewToShow} />

            </Navbar>
            }
            header={
            <Header height={70} p="md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%',}}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                    />
                </MediaQuery>
                <ActionIcon
                    variant="outline"
                    color={props.darkMode ? 'yellow' : 'blue'}
                    onClick={() => props.setDarkMode(!props.darkMode)}
                    title="Toggle color scheme"
                    mr="xl"
                >
                    {props.darkMode ? <Sun size={18} /> : <MoonStars size={18} />}
                </ActionIcon> 
                </div>
            </Header>
            }
        >
            {renderView(viewToShow, views)}
        </AppShell>
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