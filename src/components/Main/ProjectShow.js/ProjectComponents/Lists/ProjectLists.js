import React, {useState, useEffect} from 'react'
import { Stack, Grid, Button } from '@mantine/core';
import NewList from './NewList';
import ProjectList from './ProjectList';

export default function ProjectLists(props) {

    const [newList, setNewList] = useState(false);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetchLists()
    }, []);

    const fetchLists = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.projectId}/lists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            if (payload.status === "ok") {
                setLists(payload.lists)
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderLists = () => {
        if (props.lists) { 
            return props.lists.map(list => {
                return <ProjectList 
                            key={list.id}
                            listId={list.id}
                            title={list.title}
                            projectId={props.projectId}
                        />
            })
        }
    }

    return (
        <Stack>
            
            <Button onClick={() => setNewList(true)}>
                New List
            </Button>

            <Grid grow gutter="xs">
                <Grid.Col md={6}>
                    {newList && 
                        <NewList 
                            setNewList={setNewList}
                            userId={props.userId} 
                            projectId={props.projectId} 
                            setFetchAgainFlag={props.setFetchAgainFlag}
                        />
                    }
                </Grid.Col>
                {renderLists()}

            </Grid>
        </Stack>

    )
}
