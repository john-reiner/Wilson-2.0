import React, {useState} from 'react'

import { Stack } from '@mantine/core';

import NewList from './components/NewList';
import ListContainer from '../List';
import ListsNav from './containers/ListsNav/ListsNav';
import ListSelectionContainer from './containers/ListSelection/ListSelectionContainer';

export default function Lists(props) {

    const [contentTitle, setContentTitle] = useState("listSelectionContainer");
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectListsOpen, setSelectListsOpen] = useState(true);

    const handleListSelection = (id) => {
        setSelectedListId(id)
        setContentTitle('listContainer')
    }

    const content = [
        [<NewList
            listable={props.listable}
            setContentTitle={setContentTitle}
            id={props.id} 
            setSelectedListId={setSelectedListId}
        />,"newList"],
        [<ListSelectionContainer
            opened={selectListsOpen}
            setOpened={setSelectListsOpen}
            handleListSelection={handleListSelection}
            listable={props.listable}
            id={props.id}
        />,"listSelectionContainer"],
        [ <ListContainer
            listable={props.listable}
            listableId={props.id}
            id={selectedListId}
            setContentTitle={setContentTitle}
        />,"listContainer"],
    ]

    const renderContent = (content, title) => {
        return content.find(element => element[1] === title)[0]
    }

    return (
        <Stack>
            <ListsNav 
                setSelectListsOpen={setSelectListsOpen}
                setContentTitle={setContentTitle}
                setSelectedListId={setSelectedListId}
                selectedListId={selectedListId}
                contentTitle={contentTitle}
            />

            {renderContent(content, contentTitle)}

        </Stack>

    )
}
