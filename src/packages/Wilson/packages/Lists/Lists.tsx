import React, { useState} from 'react'

import { Button, Grid } from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NewList from './components/NewList';
import List from '../List/List';
import ListSelectionContainer from './containers/ListSelection';
import ListsNav from './containers/ListsNav';
import InfoContainer from '../global/InfoContainer';

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}

interface ListsProps {
    route: string
    color?: string
    colorName?: string
}

export default function Lists({
    route,
    color,
    colorName
}: ListsProps) {

    
    const [contentTitle, setContentTitle] = useState<keyof ListsComponentsInterface>("all");
    const [selectedListId, setSelectedListId] = useState<number | undefined>();
    
    const listsRoute = `${route}/lists`
    const listRoute = `${listsRoute}/${selectedListId}`

    const handleListSelection = (
        id: number
    ) => {
        setSelectedListId(id)
        setContentTitle('list')
    }

    const components = {
        "new" : <NewList
                    color={colorName}
                    route={listsRoute}
                    setContentTitle={setContentTitle}
                    setSelectedListId={setSelectedListId}
                />,
        "all": <ListSelectionContainer
                    handleListSelection={handleListSelection}
                    route={listsRoute}
                    color={color}
                />,
        "list": <List
                    id={selectedListId}
                    setContentTitle={setContentTitle}
                    route={listRoute}
                />
    }

    const renderContent = (
        componentsObject: ListsComponentsInterface,
        name: keyof ListsComponentsInterface
        ) => componentsObject[name]

    return (
        <Grid>
            <Grid.Col
                xs={3}
            >
                <InfoContainer 
                    color={color}
                    render={
                        <ListsNav
                            color={colorName}
                            contentTitle={contentTitle}
                            setContentTitle={setContentTitle}
                        />
                    }
                />
            </Grid.Col>
            <Grid.Col
                xs={9}
            >
                {renderContent(components, contentTitle)}
            </Grid.Col>
        </Grid>
    )
}
