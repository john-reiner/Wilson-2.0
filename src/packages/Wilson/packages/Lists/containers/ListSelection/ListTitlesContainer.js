import React from 'react'

import { Grid, Text, Container, Divider, Box } from '@mantine/core'
import { CircleCheck } from 'tabler-icons-react';

import ListLink from './ListLink'

export default function ListTitlesContainer(props) {

    console.log(props.completed)

    const renderListTitles = (list) => {
        if (list) {
            return list.map(list => {
                return <ListLink
                    title={list.title}
                    status={list.status}
                    id={list.id}
                    key={list.id}
                    handleListSelection={props.handleListSelection}
                />

            })
        } else {
            return <Text> No Lists </Text>
        }
    }

    return (
        <Container
            fluid
        >
            <Grid>
                {renderListTitles(props.selectedLists)}
            </Grid>
            { props.listType === "all" && 
                <div>
                    <Divider
                        my="xs"
                        variant="dashed"
                        labelPosition="center"
                        label={
                        <>
                            <CircleCheck size={12} />
                            <Box ml={5}>Completed</Box>
                        </>
                        }
                    />
                    <Grid>
                        {renderListTitles(props.completed)}
                    </Grid>

                </div>
            }

        </Container>
    )
}
