import React, { useState} from 'react'

import { Button, Grid } from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NewList from './components/NewList';
import List from '../List/List';
import ListSelectionContainer from './containers/ListSelection';
import ListsNav from './containers/ListsNav';

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}

interface ListsProps {
    route: string
}

export default function Lists({
    route
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
                    route={listsRoute}
                    setContentTitle={setContentTitle}
                    setSelectedListId={setSelectedListId}
                />,
        "all": <ListSelectionContainer
                    handleListSelection={handleListSelection}
                    route={listsRoute}
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
                xs={2}
            >
                <ListsNav 
                    contentTitle={contentTitle}
                    setContentTitle={setContentTitle}
                />


            </Grid.Col>
            <Grid.Col
                xs={10}
            >
                {renderContent(components, contentTitle)}
            </Grid.Col>
        </Grid>
    )
}
