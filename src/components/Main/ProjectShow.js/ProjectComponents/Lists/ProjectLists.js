import React, {useState} from 'react'
import { Stack, Grid, Button } from '@mantine/core';
import NewList from './NewList';
import ProjectList from './ProjectList';

export default function ProjectLists(props) {

    const [newList, setNewList] = useState(false);

    const renderLists = () => {
        if (props.lists) { 
            return props.lists.map(list => {
                return <ProjectList 
                            key={list.id}
                            listId={list.id}
                            title={list.title}
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
