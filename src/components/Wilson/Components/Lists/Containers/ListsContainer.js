import React, {useState, useEffect} from 'react'
import { Stack, Grid, Button, Group } from '@mantine/core';
import NewList from './NewList';
import ListContainer from './ListContainer';
import ListStatusNav from '../Components/ListStatusNav';

export default function ListsContainer(props) {

    const [newList, setNewList] = useState(false);
    // const [lists, setLists] = useState([]);
    const [incompleteLists, setIncompleteLists] = useState([]);
    const [completedLists, setCompletedLists] = useState([]);
    const [reloadLists, setReloadLists] = useState(true);
    const [status, setStatus] = useState('incomplete');

    console.log(status)

    useEffect(() => {
        if (reloadLists) {
            fetchLists()
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
            setIncompleteLists(payload.incomplete)
            setCompletedLists(payload.completed)

        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderLists = () => {

        if (status === 'incomplete') { 
            return incompleteLists.map(list => {
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
        if (status === 'completed') {
            return completedLists.map(list => {
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
            <Group
                position='apart'
            >

                    <ListStatusNav 
                        setStatus={setStatus}
                        status={status}
                    />                    


                    <Button onClick={() => setNewList(true)}>
                        New List
                    </Button>                    


            </Group>

            <Grid>
                {renderNewList(newList)}
                {renderLists()}
            </Grid>
        </Stack>

    )
}
