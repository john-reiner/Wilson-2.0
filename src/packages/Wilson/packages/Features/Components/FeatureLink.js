import React from 'react'
import { Grid, Paper, Text, Group } from '@mantine/core';
import StatusBadge from '../../global/StatusBadge';

export default function FeatureLink(props) {

    // const convertDate = (date) => {
    //     var dateMill = Date.parse(date)
    //     var dateObject = new Date(dateMill)
    //     var year = dateObject.getFullYear();
    //     var month = (1 + dateObject.getMonth()).toString();
    //     month = month.length > 1 ? month : '0' + month;
    //     var day = dateObject.getDate().toString();
    //     day = day.length > 1 ? day : '0' + day;
    //     return month + '/' + day + '/' + year;
    // }

    // const calcOverdue = (date) => {
    //     var dateMill = Date.parse(date)
    //     var dateObject = new Date(dateMill)
    //     var today = new Date()
    //     if (dateObject - today < 0) {
    //         return true
    //     }
    //     return false
    // }

    return (
            <Paper 
                p="md" 
                withBorder
                sx={(theme) => ({
                    backgroundColor: theme.colors.dark,
                    '&:hover': {
                    backgroundColor: theme.colors.dark[7],
                    cursor: "pointer"
                    },
                })}
                onClick={() => props.handleLinkClick(props.id)}
            >
                <Grid align="center">
                    <Grid.Col span={7}>
                        <Text lineClamp={1} order={3}>{props.title}</Text>
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Group position="right" spacing="xs">
                            <StatusBadge 
                                status={props.status}
                            />

                        </Group>
                    </Grid.Col>
                </Grid>
            </Paper>

    )
}