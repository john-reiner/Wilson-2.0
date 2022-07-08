import React, {useState, useEffect} from 'react'
import { Stack, Grid, Button } from '@mantine/core';
import NewList from './NewList';
import ProjectList from './ProjectList';

export default function ProjectLists(props) {

    const [newList, setNewList] = useState(false);
    const [lists, setLists] = useState([]);
    const [reloadLists, setReloadLists] = useState(true);

    useEffect(() => {
        if (reloadLists) {
            fetchLists()
            setReloadLists(false)
        }
        // fetchLists()
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
        .then(payload => setLists(payload.lists))
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderLists = () => {
        if (lists.length > 0) { 
            return lists.map(list => {
                return <ProjectList 
                            key={list.id}
                            listId={list.id}
                            title={list.title}
                            projectId={props.projectId}
                            tasks={list.tasks}
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
                            setNewList={setNewList}
                            userId={props.userId} 
                            projectId={props.projectId} 
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

            <Grid grow gutter="xs">
                {renderNewList(newList)}
                {renderLists()}

            </Grid>
        </Stack>

    )
}
