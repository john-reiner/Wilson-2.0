import React from 'react'
import {
    Header,
    MediaQuery,
    Burger,
    useMantineTheme
} from '@mantine/core';

import LightDarkSwitch from '../../global/LightDarkSwitch';

export default function TopHeader(props) {

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
                        onClick={() => props.setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <LightDarkSwitch />
            </div>
        </Header>
    )
}
