import React from 'react'

import {
    Header
} from '@mantine/core';

import LightDarkSwitch from '../../global/LightDarkSwitch';

export default function HeaderContainer() {

    return (
        <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <LightDarkSwitch/>
            </div>
        </Header>
    )
}
