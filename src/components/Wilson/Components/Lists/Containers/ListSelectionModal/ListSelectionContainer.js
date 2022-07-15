import React, {useState, useEffect} from 'react'
import { Divider, Modal, SegmentedControl } from '@mantine/core';
import ListTitlesContainer from './ListTitlesContainer';

export default function ListSelectionContainer(props) {

    const [lists, setLists] = useState(false);
    const [listType, setListType] = useState('all');
    const [selectedLists, setSelectedLists] = useState([]);

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

    return (
        <div
            // opened={props.opened}
            // onClose={() => props.setOpened(false)}
            // title="Select a list"
            // size="xl"
            // overflow="inside"
        >
            <SegmentedControl
                data={[
                    { label: 'All', value: 'all' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'In Progress', value: 'working' },
                    { label: 'Ready to Complete', value: 'ready' },
                    { label: 'Completed', value: 'completed' },
                ]}
                value={listType}
                onChange={setListType}
                fullWidth
                color="green"
            />
            <Divider my="xs"/>
            <ListTitlesContainer
                listType={listType}
                selectedLists={selectedLists}
                handleListSelection={props.handleListSelection}
            />
        </div>
    )
}
