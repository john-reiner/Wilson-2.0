import React, {useState} from 'react'
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    ActionIcon,
} from '@mantine/core';

import { Sun, MoonStars } from 'tabler-icons-react';

import LeftNavbar from './LeftNavbar';
import Projects from './Projects/Projects';
import Project from './ProjectShow.js/Project'
import NewProject from './Projects/NewProject'

export default function Main(props) {

    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false);
    const [viewToShow, setViewToShow] = useState(0);
    const [projectShowId, setProjectShowId] = useState(null);

    const handleProjectShow = id => {
        setProjectShowId(id)
        setViewToShow(1)
    }

    const renderView = (viewToShow, viewsArray) => viewsArray[viewToShow]

    const views = [
        <Projects 
            setViewToShow={setViewToShow}
            handleProjectShow={handleProjectShow} 
            userId={props.userId}
            viewTitle="Projects" 
        />,
        <Project 
            id={projectShowId} 
            userId={props.userId}  
            viewTitle="Project"
            setViewToShow={setViewToShow}
        />,
        <NewProject 
            handleProjectShow={handleProjectShow} 
            viewTitle="New Project" 
            setViewToShow={setViewToShow} 
            userId={props.userId} 
        />
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
                <Header 
                    height={70} p="md"
                >
                    <div 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            height: '100%',
                        }}
                    >
                    <MediaQuery 
                        largerThan="sm" 
                        styles={{ display: 'none' }}
                    >
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