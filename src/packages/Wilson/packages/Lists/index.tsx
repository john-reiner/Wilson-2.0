import React, { useState} from 'react'

import { Button, Stack } from '@mantine/core';

import NewList from './components/NewList';
import List from '../List';
import ListSelectionContainer from './containers/ListSelectionContainer';

export interface ListsComponentsInterface {
    new: JSX.Element;
    all: JSX.Element;
    list: JSX.Element;
}

interface ListsProps {
    projectId: number
    featureId?: number
    listable: "projects" | "features"
}

export default function Lists({
    projectId,
    featureId,
    listable
}: ListsProps) {

    const [contentTitle, setContentTitle] = useState<keyof ListsComponentsInterface>("all");
    const [selectedListId, setSelectedListId] = useState<number | undefined>();

    const handleListSelection = (
        id: number
    ) => {
        setSelectedListId(id)
        setContentTitle('list')
    }

    const newButtonClick = () => setContentTitle("new")

    const components = {
        "new" : <NewList
                    listable={listable}
                    setContentTitle={setContentTitle}
                    projectId={projectId}
                    featureId={featureId}
                    setSelectedListId={setSelectedListId}
                />,
        "all": <ListSelectionContainer
                    handleListSelection={handleListSelection}
                    listable={listable}
                    projectId={projectId}
                    featureId={featureId}
                    newButtonClick={newButtonClick}
                />,
        "list": <List
                    listable={listable}
                    projectId={projectId}
                    featureId={featureId}
                    id={selectedListId}
                    setContentTitle={setContentTitle}
                />
    }

    const renderContent = (
        componentsObject: ListsComponentsInterface,
        name: keyof ListsComponentsInterface
        ) => componentsObject[name]

    return (
        <Stack>
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
