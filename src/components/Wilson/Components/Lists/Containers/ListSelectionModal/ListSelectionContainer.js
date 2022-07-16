import React, {useState, useEffect} from 'react'
import { Divider, ColorSwatch, SegmentedControl, Box, Text } from '@mantine/core';
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

    const renderSegmentedLabel = (string, amount) => {
        return (
            <Box
            style={
                    {
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }
                }
            >
                <Text >{string} </Text>
                <Text>{amount}</Text>
            </Box>
        )
    }

    return (
        <div>
            {lists.counts && 
                <SegmentedControl
                    data={[
                        { label: (renderSegmentedLabel("All", lists.counts.all)), value: 'all' },
                        { label: (renderSegmentedLabel("Pending", lists.counts.pending)), value: 'pending' },
                        { label: (renderSegmentedLabel("Working", lists.counts.working)), value: 'working' },
                        { label: (renderSegmentedLabel("Ready to Complete", lists.counts.ready)), value: 'ready' },
                        { label: (renderSegmentedLabel("Completed", lists.counts.completed)), value: 'completed' },
                    ]}
                    value={listType}
                    onChange={setListType}
                    fullWidth
                    color="green"
                />
            }
            <Divider my="xs"/>
            

            <ListTitlesContainer
                listType={listType}
                selectedLists={selectedLists}
                handleListSelection={props.handleListSelection}
            />
        </div>
    )
}
