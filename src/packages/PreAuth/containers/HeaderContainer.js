import React from 'react'
import {
    Header,
    ActionIcon, 
    useMantineColorScheme 
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

export default function HeaderContainer() {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    
    return (
        <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
