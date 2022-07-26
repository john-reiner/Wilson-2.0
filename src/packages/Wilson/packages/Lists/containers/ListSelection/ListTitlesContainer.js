import React from 'react'

import { Grid, Text } from '@mantine/core'

import ListLink from './ListLink'

export default function ListTitlesContainer(props) {

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
        <Grid>
            {renderListTitles(props.selectedLists)}
        </Grid>
        // <Box
        //     style={
        //         {
        //             display: "flex",
        //             flexDirection: "column",
        //             alignItems: "center",
        //         }
        //     }
        // >
        //     
        // </Box>
    )
}
