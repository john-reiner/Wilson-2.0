import React, { useState} from 'react'

import { Button, Stack } from '@mantine/core';

import NewList from './components/NewList';
import List from '../List/List';
import ListSelectionContainer from './containers/ListSelectionContainer';

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
        <Stack>
            <Button

                color="blue"
                onClick={() => setContentTitle("new")}
            >
                New List
            </Button>
            {contentTitle !== "all" &&
                <Button
                    variant="outline" 
                    color="green"
                    onClick={() => setContentTitle("all")}
                >All Lists</Button>
            }
            {renderContent(components, contentTitle)}
        </Stack>
    )
}
