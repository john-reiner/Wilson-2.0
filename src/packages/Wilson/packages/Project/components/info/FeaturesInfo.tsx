import React from 'react'
import { Card, Image, Text, Title, Divider, Paper, Progress, Grid, Group, RingProgress, Stack, Table, Box } from '@mantine/core';
import { featuresDataType } from '../../../global/interfaces/projectInterfaces';

interface DescriptionCardProps {
    totals?: featuresDataType
    color?: string
}

export default function DescriptionCard({
    totals,
    color
}: DescriptionCardProps) {

    console.log(totals)

    const renderPercents = (
        total: number | undefined,
        valueTotal: number | undefined
    ) => {
        if (valueTotal && total) {
            return valueTotal / total * 100
        } else {
            return 0
        }
    }

    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing.sm,
            })}
        >
            <Grid>
                <Grid.Col>
                    <Progress
                        label='status'
                        size="xl"
                        radius="xs"
                        sections={[
                            { value: renderPercents(totals?.total, totals?.priorities.low), color: 'blue', label: 'Low', tooltip: `${totals?.priorities.low} Features`},
                            { value: renderPercents(totals?.total, totals?.priorities.medium), color: 'yellow', label: 'Medium', tooltip: `${totals?.priorities.medium} Features` },
                            { value: renderPercents(totals?.total, totals?.priorities.high), color: 'red', label: 'High', tooltip: `${totals?.priorities.high} Features` },
                        ]}
                        />
                </Grid.Col>
                <Grid.Col
                    sm={4}
                    >
                    <Group position="center">
                        <RingProgress
                            size={170}
                            thickness={16}
                            label={
                                <Text size="xs" align="center" px="xs" sx={{ pointerEvents: 'none' }}>
                                Statuses
                            </Text>
                            }
                            sections={[
                                { value: renderPercents(totals?.total, totals?.status.created), color: 'yellow',  tooltip: `${totals?.status.created} Created`},
                                { value: renderPercents(totals?.total, totals?.status.working), color: 'orange', tooltip: `${totals?.status.working} Working` },
                                { value: renderPercents(totals?.total, totals?.status.ready), color: 'green', tooltip: `${totals?.status.ready} Ready to Complete` },
                                { value: renderPercents(totals?.total, totals?.status.completed), color: 'blue', tooltip: `${totals?.status.completed} Completed` },
                                { value: renderPercents(totals?.total, totals?.status.paused), color: 'gray', tooltip: `${totals?.status.paused} Paused` },
                            ]}
                            />
                    </Group>
                </Grid.Col>
                <Grid.Col
                    sm={8}
                    >
                    <Table>
                        {/* <caption>Priority</caption> */}
                        <thead>
                            <tr>
                                <th>Low</th>
                                <th>Medium</th>
                                <th>High</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totals?.priorities.low}</td>
                                <td>{totals?.priorities.medium}</td>
                                <td>{totals?.priorities.high}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>

                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Working</th>
                                <th>Paused</th>
                                <th>Ready</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totals?.status.created}</td>
                                <td>{totals?.status.working}</td>
                                <td>{totals?.status.paused}</td>
                                <td>{totals?.status.ready}</td>
                                <td>{totals?.status.completed}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid.Col>
            </Grid>
        </Box>
    )
}
