import React from 'react'

import { Grid, Paper, Text, Group } from '@mantine/core';

import StatusBadge from '../../global/StatusBadge';

export default function FeatureLink(props) {

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