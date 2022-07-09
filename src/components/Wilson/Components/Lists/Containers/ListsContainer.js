import React, {useState, useEffect} from 'react'
import { Stack, Grid, Button } from '@mantine/core';
import NewList from './NewList';
import ListContainer from './ListContainer';

export default function ListsContainer(props) {

    const [newList, setNewList] = useState(false);
    const [lists, setLists] = useState([]);
    const [reloadLists, setReloadLists] = useState(true);

    useEffect(() => {
        if (reloadLists) {
            fetchLists()
            console.log("works?")
            setReloadLists(false)
        }
    }, [reloadLists]);

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
            setLists(payload.lists)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderLists = () => {
        if (lists) { 
            return lists.map(list => {
                return <ListContainer 
                            list={{...list}}
                            key={list.id}
                            projectId={props.projectId}
                            listable={props.listable}
                            listableId={props.id}
                            setReloadLists={setReloadLists}
                        />
            })
        }
    }

    const renderNewList = (showFlag) => {
        if (showFlag) {
            return (
                <Grid.Col md={6}>
                    {newList && 
                        <NewList
                            listable={props.listable}
                            setNewList={setNewList}
                            id={props.id} 
                            setReloadLists={setReloadLists}
                        />
                    }
                </Grid.Col>                
            )
        }
    }

    return (
        <Stack>
            
            <Button onClick={() => setNewList(true)}>
                New List
            </Button>

            <Grid>
                {renderNewList(newList)}
                {renderLists()}

            </Grid>
        </Stack>

    )
}
