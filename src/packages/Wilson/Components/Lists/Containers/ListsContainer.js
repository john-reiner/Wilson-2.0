import React, {useState, useEffect} from 'react'
import { Stack, Grid, Button, Group } from '@mantine/core';
import NewList from '../Components/NewList';
import ListContainer from './ListContainer';
import ListsNav from './ListsNav/ListsNav';
import CompletedListsContainer from './CompletedListsContainer';
import ListSelectionContainer from './ListSelectionModal/ListSelectionContainer';
import ListTitlesContainer from './ListSelectionModal/ListTitlesContainer';


export default function ListsContainer(props) {

    // const [newList, setNewList] = useState(false);


    const [contentTitle, setContentTitle] = useState("listSelectionContainer");
    const [selectedListId, setSelectedListId] = useState(null);
    const [listTitleData, setListTitleData] = useState([]);
    const [selectListsOpen, setSelectListsOpen] = useState(true);

    // useEffect(() => {
    //     if (reloadLists) {
    //         fetchLists()
    //         setReloadLists(false)
    //     }
    //     if (selectedListId === null && lists.length > 0) {
    //         console.log(selectedListId)
    //         setSelectListsOpen(true)
    //     }
    // }, [reloadLists, selectedListId, lists]);

    const handleListSelection = (id) => {
        setSelectedListId(id)
        setContentTitle('listContainer')
    }

    // const applyTitles = () => {
    //     let data = []
    //     incompleteLists.forEach(list => {
    //         let newObject = { label: list.title, value: list.id }
    //         data.push(newObject)
    //     })
    //     setListTitleData(data)
    //     setSelectedListId(incompleteLists[0].id)
    // }



    const content = [
        [<NewList
            listable={props.listable}
            setContentTitle={setContentTitle}
            // setNewList={setNewList}
            id={props.id} 
            // setReloadLists={setReloadLists}
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
                // setNewList={setNewList}
                // completedLists={completedLists}
                setSelectListsOpen={setSelectListsOpen}
                setContentTitle={setContentTitle}
                // incompleteLists={incompleteLists}
                listTitleData={listTitleData}
                setSelectedListId={setSelectedListId}
                selectedListId={selectedListId}
                contentTitle={contentTitle}
            />
            {/* {selectListsOpen && 
                <ListSelectionContainer
                    opened={selectListsOpen}
                    setOpened={setSelectListsOpen}
                    handleListSelection={handleListSelection}
                    listable={props.listable}
                    id={props.id}
                />
            } */}

            {renderContent(content, contentTitle)}

        </Stack>

    )
}
