import React from 'react'
import {
    Text,
    MediaQuery,
    Burger,
    Header,
    useMantineTheme,
    ActionIcon, 
    useMantineColorScheme 
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

export default function HeaderContent(props) {

    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    
    return (
        <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={props.opened}
                    onClick={() => props.setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
                </MediaQuery>

                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                    >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                </ActionIcon>
            </div>
        </Header>
    )
}
