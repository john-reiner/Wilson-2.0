import React, {useState} from 'react'
import {
    Header,
    MediaQuery,
    Burger,
    ActionIcon,
    useMantineTheme
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

export default function TopHeader(props) {

    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();


    return (
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
                        opened={props.opened}
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
    )
}
