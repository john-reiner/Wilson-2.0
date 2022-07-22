import React, {useState, useEffect} from 'react'
import { Divider, Tabs, SegmentedControl, Box, Text } from '@mantine/core';
import ListTitlesContainer from './ListTitlesContainer';

export default function ListSelectionContainer(props) {

    const [lists, setLists] = useState(false);
    const [listType, setListType] = useState('all');
    const [selectedLists, setSelectedLists] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    console.log(listType)

    useEffect(() => {
        fetchLists()
        setSelectedLists(lists[listType])
    }, [listType]);

    const fetchLists = () => {
        fetch(`http://localhost:3001/api/v2/${props.listable}/${props.id}/lists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            setLists(payload)
            setSelectedLists(payload[listType])

        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const tabs = ['all', 'pending', 'working', 'ready', 'completed']

    const handleTabChange = (e) => {
        setActiveTab(e)
        setListType(tabs[e])
    } 

    const renderContainer = () => {
        return (
            <ListTitlesContainer
                listType={listType}
                selectedLists={selectedLists}
                handleListSelection={props.handleListSelection}
            />            
        )            
    }

    return (
        <div>
            {lists.counts && 
                <Tabs
                    active={activeTab} 
                    onTabChange={handleTabChange}
                    variant="pills"
                >
                    <Tabs.Tab onClick={() => setListType('all')} label={`All (${lists.counts.all})`}>{renderContainer()}</Tabs.Tab>
                    <Tabs.Tab onClick={() => setListType('pending')} label={`Pending (${lists.counts.pending})`}>{renderContainer()}</Tabs.Tab>
                    <Tabs.Tab onClick={() => setListType('working')} label={`Working (${lists.counts.working})`}>{renderContainer()}</Tabs.Tab>
                    <Tabs.Tab onClick={() => setListType('ready')} label={`Ready to Complete (${lists.counts.ready})`}>{renderContainer()}</Tabs.Tab>
                    <Tabs.Tab onClick={() => setListType('completed')} label={`Completed (${lists.counts.completed})`}>{renderContainer()}</Tabs.Tab>
                </Tabs>
            }
        </div>
    )
}
